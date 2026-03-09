import { useState, useRef } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAddCollection, useAddEndpoint } from "@/hooks/useApiData";
import { toast } from "sonner";
import { HttpMethod, ApiParameter } from "@/data/sampleSpecs";
import { Json } from "@/integrations/supabase/types";

interface ImportSpecButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  onImported?: (collectionId: string) => void;
}

export function ImportSpecButton({ variant = "outline", size = "default", onImported }: ImportSpecButtonProps) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const addCollection = useAddCollection();
  const addEndpoint = useAddEndpoint();

  const handleFile = async (file: File) => {
    setLoading(true);
    const toastId = toast.loading("Parsing API spec...");

    try {
      const content = await file.text();
      const format = file.name.endsWith(".json") ? "json" : "yaml";

      // Call edge function
      const { data, error } = await supabase.functions.invoke("parse-openapi", {
        body: { content, format },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      const { collection, endpoints } = data;

      // Create collection
      const col = await addCollection.mutateAsync({
        name: collection.name,
        description: collection.description,
        baseUrl: collection.base_url,
        version: collection.version,
      });

      // Create endpoints
      let created = 0;
      for (const ep of endpoints) {
        try {
          await addEndpoint.mutateAsync({
            collectionId: col.id,
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

      // Store original file
      const filePath = `${col.id}/${file.name}`;
      await supabase.storage.from("endpoint-docs").upload(filePath, file);

      toast.success(`Imported "${collection.name}" with ${created} endpoints`, { id: toastId });
      onImported?.(col.id);
    } catch (e) {
      console.error("Import error:", e);
      toast.error(e instanceof Error ? e.message : "Failed to import spec", { id: toastId });
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".json,.yaml,.yml"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
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
        {loading ? "Importing..." : "Import Spec"}
      </Button>
    </>
  );
}
