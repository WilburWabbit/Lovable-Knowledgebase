import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAddCollection, useAddEndpoint } from "@/hooks/useApiData";
import { toast } from "sonner";
import { HttpMethod, ApiParameter } from "@/data/sampleSpecs";
import { Json } from "@/integrations/supabase/types";
import { useQueryClient } from "@tanstack/react-query";

interface ImportSpecButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  onImported?: (collectionId: string) => void;
}

export function ImportSpecButton({ variant = "outline", size = "default", onImported }: ImportSpecButtonProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const addCollection = useAddCollection();
  const addEndpoint = useAddEndpoint();
  const queryClient = useQueryClient();

  const importSingleFile = async (file: File): Promise<{ name: string; endpoints: number; mode: "created" | "updated" }> => {
    const content = await file.text();
    const format = file.name.endsWith(".json") ? "json" : "yaml";

    const { data, error } = await supabase.functions.invoke("parse-openapi", {
      body: { content, format },
    });

    // Surface specific error messages from the edge function
    if (error) {
      const msg = data?.error || error.message || "Unknown error";
      const isFatal = msg.includes("credits") || msg.includes("Rate limit");
      const err = new Error(msg);
      (err as any).fatal = isFatal;
      throw err;
    }
    if (data?.error) {
      const isFatal = data.error.includes("credits") || data.error.includes("Rate limit");
      const err = new Error(data.error);
      (err as any).fatal = isFatal;
      throw err;
    }

    const { collection, endpoints } = data;

    // Check if a collection with the same name already exists
    const { data: existingCols } = await supabase
      .from("api_collections")
      .select("id, name")
      .eq("name", collection.name)
      .limit(1);

    const existingCol = existingCols?.[0];
    let colId: string;
    let mode: "created" | "updated";

    if (existingCol) {
      // Update existing collection metadata
      colId = existingCol.id;
      mode = "updated";
      await supabase
        .from("api_collections")
        .update({
          description: collection.description,
          base_url: collection.base_url,
          version: collection.version,
        })
        .eq("id", colId);

      // Fetch existing endpoints for matching
      const { data: existingEndpoints } = await supabase
        .from("api_endpoints")
        .select("id, method, path")
        .eq("collection_id", colId);

      const existingMap = new Map(
        (existingEndpoints ?? []).map((ep) => [`${ep.method.toUpperCase()}:${ep.path}`, ep.id])
      );

      let upserted = 0;
      for (const ep of endpoints) {
        const key = `${(ep.method as string).toUpperCase()}:${ep.path}`;
        const existingId = existingMap.get(key);
        try {
          if (existingId) {
            // Update existing endpoint
            await supabase
              .from("api_endpoints")
              .update({
                summary: ep.summary || ep.path,
                description: ep.description || "",
                parameters: (ep.parameters || []) as unknown as Json,
                request_body: ep.request_body || null,
                response_example: ep.response_example || "{}",
                tags: ep.tags || [],
              })
              .eq("id", existingId);
          } else {
            // Create new endpoint
            await addEndpoint.mutateAsync({
              collectionId: colId,
              method: ep.method as HttpMethod,
              path: ep.path,
              summary: ep.summary || ep.path,
              description: ep.description || "",
              parameters: (ep.parameters || []) as ApiParameter[],
              requestBody: ep.request_body || undefined,
              responseExample: ep.response_example || "{}",
              tags: ep.tags || [],
            });
          }
          upserted++;
        } catch (e) {
          console.warn("Failed to upsert endpoint:", ep.path, e);
        }
      }

      // Invalidate queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ["api-collections"] });

      const filePath = `${colId}/${file.name}`;
      await supabase.storage.from("endpoint-docs").upload(filePath, file, { upsert: true });

      onImported?.(colId);
      return { name: collection.name, endpoints: upserted, mode };
    } else {
      // Create new collection
      mode = "created";
      const col = await addCollection.mutateAsync({
        name: collection.name,
        description: collection.description,
        baseUrl: collection.base_url,
        version: collection.version,
      });
      colId = col.id;

      let created = 0;
      for (const ep of endpoints) {
        try {
          await addEndpoint.mutateAsync({
            collectionId: colId,
            method: ep.method as HttpMethod,
            path: ep.path,
            summary: ep.summary || ep.path,
            description: ep.description || "",
            parameters: (ep.parameters || []) as ApiParameter[],
            requestBody: ep.request_body || undefined,
            responseExample: ep.response_example || "{}",
            tags: ep.tags || [],
          });
          created++;
        } catch (e) {
          console.warn("Failed to create endpoint:", ep.path, e);
        }
      }

      const filePath = `${colId}/${file.name}`;
      await supabase.storage.from("endpoint-docs").upload(filePath, file);

      onImported?.(colId);
      return { name: collection.name, endpoints: created, mode };
    }
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setLoading(true);
    const isBatch = fileArray.length > 1;
    const toastId = toast.loading(
      isBatch ? `Importing ${fileArray.length} specs...` : "Parsing API spec..."
    );

    const results: { name: string; endpoints: number }[] = [];
    const errors: string[] = [];

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      if (isBatch) {
        setProgress(`${i + 1}/${fileArray.length}: ${file.name}`);
        toast.loading(`Importing ${i + 1}/${fileArray.length}: ${file.name}`, { id: toastId });
      }

      try {
        const result = await importSingleFile(file);
        results.push(result);
      } catch (e: any) {
        console.error(`Import error for ${file.name}:`, e);
        // Stop batch on fatal errors (credits exhausted, rate limited)
        if (e?.fatal) {
          toast.error(e.message, { id: toastId });
          setLoading(false);
          setProgress("");
          if (fileRef.current) fileRef.current.value = "";
          return;
        }
        errors.push(file.name);
      }
    }

    if (results.length > 0 && errors.length === 0) {
      const totalEps = results.reduce((sum, r) => sum + r.endpoints, 0);
      toast.success(
        isBatch
          ? `Imported ${results.length} APIs with ${totalEps} total endpoints`
          : `Imported "${results[0].name}" with ${results[0].endpoints} endpoints`,
        { id: toastId }
      );
    } else if (results.length > 0 && errors.length > 0) {
      toast.warning(
        `Imported ${results.length} APIs. Failed: ${errors.join(", ")}`,
        { id: toastId }
      );
    } else {
      toast.error(`Failed to import: ${errors.join(", ")}`, { id: toastId });
    }

    setLoading(false);
    setProgress("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".json,.yaml,.yml"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) handleFiles(e.target.files);
        }}
      />
      <Button
        variant={variant}
        size={size}
        disabled={loading}
        className="gap-1.5"
        onClick={() => fileRef.current?.click()}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {loading ? (progress || "Importing...") : "Import Spec"}
      </Button>
    </>
  );
}
