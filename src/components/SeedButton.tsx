import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { sampleCollections } from "@/data/sampleSpecs";
import { useQueryClient } from "@tanstack/react-query";
import { Json } from "@/integrations/supabase/types";

export function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const queryClient = useQueryClient();

  const handleSeed = async () => {
    setLoading(true);
    try {
      for (const col of sampleCollections) {
        const { data: inserted, error: colErr } = await supabase
          .from("api_collections")
          .insert({
            name: col.name,
            description: col.description,
            base_url: col.baseUrl,
            version: col.version,
          })
          .select()
          .single();

        if (colErr) throw colErr;

        const endpoints = col.endpoints.map((ep, i) => ({
          collection_id: inserted.id,
          method: ep.method,
          path: ep.path,
          summary: ep.summary,
          description: ep.description,
          parameters: ep.parameters as unknown as Json,
          request_body: ep.requestBody ?? null,
          response_example: ep.responseExample,
          tags: ep.tags,
          sort_order: i,
        }));

        const { error: epErr } = await supabase.from("api_endpoints").insert(endpoints);
        if (epErr) throw epErr;
      }

      await queryClient.invalidateQueries({ queryKey: ["api-collections"] });
      setDone(true);
    } catch (err) {
      console.error("Seed error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (done) return null;

  return (
    <button
      onClick={handleSeed}
      disabled={loading}
      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      {loading ? "Seeding..." : "Load sample API specs"}
    </button>
  );
}
