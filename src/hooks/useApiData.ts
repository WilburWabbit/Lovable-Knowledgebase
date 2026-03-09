import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ApiCollection, ApiEndpoint, ApiParameter, HttpMethod } from "@/data/sampleSpecs";
import { Json } from "@/integrations/supabase/types";

function parseParameters(params: Json): ApiParameter[] {
  if (!Array.isArray(params)) return [];
  return params.map((p: any) => ({
    name: p.name ?? "",
    type: p.type ?? "string",
    required: p.required ?? false,
    description: p.description ?? "",
  }));
}

export function useCollections() {
  return useQuery({
    queryKey: ["api-collections"],
    queryFn: async (): Promise<ApiCollection[]> => {
      const { data: collections, error: colError } = await supabase
        .from("api_collections")
        .select("*")
        .order("name");

      if (colError) throw colError;
      if (!collections?.length) return [];

      const { data: endpoints, error: epError } = await supabase
        .from("api_endpoints")
        .select("*")
        .order("sort_order");

      if (epError) throw epError;

      // Build flat collection map
      const colMap = new Map<string, ApiCollection>();
      for (const col of collections) {
        colMap.set(col.id, {
          id: col.id,
          name: col.name,
          description: col.description,
          baseUrl: col.base_url,
          version: col.version,
          parentId: (col as any).parent_id ?? null,
          endpoints: (endpoints ?? [])
            .filter((ep) => ep.collection_id === col.id)
            .map((ep) => ({
              id: ep.id,
              method: ep.method as HttpMethod,
              path: ep.path,
              summary: ep.summary,
              description: ep.description,
              parameters: parseParameters(ep.parameters),
              requestBody: ep.request_body ?? undefined,
              responseExample: ep.response_example,
              tags: ep.tags ?? [],
            })),
          children: [],
        });
      }

      // Build tree: attach children to parents
      const roots: ApiCollection[] = [];
      for (const col of colMap.values()) {
        if (col.parentId && colMap.has(col.parentId)) {
          colMap.get(col.parentId)!.children!.push(col);
        } else if (!col.parentId) {
          roots.push(col);
        } else {
          // orphan — show at root
          roots.push(col);
        }
      }

      return roots;
    },
  });
}

export function useAddCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (col: { name: string; description: string; baseUrl: string; version: string }) => {
      const { data, error } = await supabase
        .from("api_collections")
        .insert({ name: col.name, description: col.description, base_url: col.baseUrl, version: col.version })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-collections"] }),
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (col: { id: string; name: string; description: string; baseUrl: string; version: string }) => {
      const { data, error } = await supabase
        .from("api_collections")
        .update({ name: col.name, description: col.description, base_url: col.baseUrl, version: col.version })
        .eq("id", col.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-collections"] }),
  });
}

export function useAddEndpoint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ep: {
      collectionId: string;
      method: HttpMethod;
      path: string;
      summary: string;
      description: string;
      parameters: ApiParameter[];
      requestBody?: string;
      responseExample: string;
      tags: string[];
    }) => {
      const { data, error } = await supabase
        .from("api_endpoints")
        .insert({
          collection_id: ep.collectionId,
          method: ep.method,
          path: ep.path,
          summary: ep.summary,
          description: ep.description,
          parameters: ep.parameters as unknown as Json,
          request_body: ep.requestBody ?? null,
          response_example: ep.responseExample,
          tags: ep.tags,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-collections"] }),
  });
}

export function useUpdateEndpoint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ep: {
      id: string;
      method: HttpMethod;
      path: string;
      summary: string;
      description: string;
      parameters: ApiParameter[];
      requestBody?: string;
      responseExample: string;
      tags: string[];
    }) => {
      const { data, error } = await supabase
        .from("api_endpoints")
        .update({
          method: ep.method,
          path: ep.path,
          summary: ep.summary,
          description: ep.description,
          parameters: ep.parameters as unknown as Json,
          request_body: ep.requestBody ?? null,
          response_example: ep.responseExample,
          tags: ep.tags,
        })
        .eq("id", ep.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-collections"] }),
  });
}

export function useDeleteCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("api_collections").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-collections"] }),
  });
}

export function useDeleteEndpoint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("api_endpoints").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["api-collections"] }),
  });
}
