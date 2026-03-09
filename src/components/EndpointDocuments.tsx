import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, FileText, FileCode, FileType, File, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface EndpointDocument {
  id: string;
  endpoint_id: string;
  file_name: string;
  file_format: string;
  file_path: string;
  file_size: number;
  created_at: string;
}

const FORMAT_CONFIG: Record<string, { label: string; icon: typeof FileText; accept: string; mime: string[] }> = {
  json: { label: "JSON", icon: FileCode, accept: ".json", mime: ["application/json"] },
  yaml: { label: "YAML", icon: FileType, accept: ".yaml,.yml", mime: ["application/x-yaml", "text/yaml", "text/plain"] },
  xml: { label: "XML", icon: FileCode, accept: ".xml", mime: ["application/xml", "text/xml"] },
  pdf: { label: "PDF", icon: FileText, accept: ".pdf", mime: ["application/pdf"] },
};

const FORMATS = ["json", "yaml", "xml", "pdf"] as const;

function useEndpointDocuments(endpointId: string) {
  return useQuery({
    queryKey: ["endpoint-documents", endpointId],
    queryFn: async (): Promise<EndpointDocument[]> => {
      const { data, error } = await supabase
        .from("endpoint_documents")
        .select("*")
        .eq("endpoint_id", endpointId)
        .order("file_format");
      if (error) throw error;
      return (data ?? []) as EndpointDocument[];
    },
  });
}

function getPublicUrl(filePath: string) {
  return supabase.storage.from("endpoint-docs").getPublicUrl(filePath).data.publicUrl;
}

export function EndpointDocuments({ endpointId }: { endpointId: string }) {
  const { data: docs = [], isLoading } = useEndpointDocuments(endpointId);
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState<string | null>(null);
  const [textContents, setTextContents] = useState<Record<string, string>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const docsByFormat = Object.fromEntries(
    FORMATS.map((f) => [f, docs.find((d) => d.file_format === f) ?? null])
  );

  const uploadMutation = useMutation({
    mutationFn: async ({ file, format }: { file: File; format: string }) => {
      const storagePath = `${endpointId}/${format}/${file.name}`;

      // If a doc for this format exists, delete old one first
      const existing = docsByFormat[format];
      if (existing) {
        await supabase.storage.from("endpoint-docs").remove([existing.file_path]);
        await supabase.from("endpoint_documents").delete().eq("id", existing.id);
      }

      const { error: uploadError } = await supabase.storage
        .from("endpoint-docs")
        .upload(storagePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase.from("endpoint_documents").insert({
        endpoint_id: endpointId,
        file_name: file.name,
        file_format: format,
        file_path: storagePath,
        file_size: file.size,
      });
      if (dbError) throw dbError;
    },
    onSuccess: (_, { format }) => {
      queryClient.invalidateQueries({ queryKey: ["endpoint-documents", endpointId] });
      setTextContents((prev) => ({ ...prev, [format]: "" }));
      toast.success("Document uploaded");
    },
    onError: (err: any) => toast.error(err.message ?? "Upload failed"),
    onSettled: () => setUploading(null),
  });

  const deleteMutation = useMutation({
    mutationFn: async (doc: EndpointDocument) => {
      await supabase.storage.from("endpoint-docs").remove([doc.file_path]);
      const { error } = await supabase.from("endpoint_documents").delete().eq("id", doc.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["endpoint-documents", endpointId] });
      toast.success("Document removed");
    },
  });

  const handleUpload = (format: string) => {
    const input = fileInputRefs.current[format];
    if (input) input.click();
  };

  const handleFileChange = async (format: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(format);
    uploadMutation.mutate({ file, format });
    e.target.value = "";
  };

  // Load text content for viewable formats
  const loadTextContent = async (doc: EndpointDocument) => {
    if (textContents[doc.file_format]) return;
    try {
      const url = getPublicUrl(doc.file_path);
      const res = await fetch(url);
      const text = await res.text();
      setTextContents((prev) => ({ ...prev, [doc.file_format]: text }));
    } catch {
      setTextContents((prev) => ({ ...prev, [doc.file_format]: "Failed to load content" }));
    }
  };

  const existingFormats = FORMATS.filter((f) => docsByFormat[f]);
  const defaultTab = existingFormats[0] ?? "json";

  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-foreground mb-3">Documentation Files</h3>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="mb-3">
          {FORMATS.map((format) => {
            const config = FORMAT_CONFIG[format];
            const hasDoc = !!docsByFormat[format];
            const Icon = config.icon;
            return (
              <TabsTrigger
                key={format}
                value={format}
                className="gap-1.5"
                onClick={() => {
                  const doc = docsByFormat[format];
                  if (doc && format !== "pdf") loadTextContent(doc);
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                {config.label}
                {hasDoc && (
                  <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[hsl(var(--method-get))]" />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {FORMATS.map((format) => {
          const config = FORMAT_CONFIG[format];
          const doc = docsByFormat[format];

          return (
            <TabsContent key={format} value={format}>
              {/* Hidden file input */}
              <input
                ref={(el) => { fileInputRefs.current[format] = el; }}
                type="file"
                accept={config.accept}
                className="hidden"
                onChange={(e) => handleFileChange(format, e)}
              />

              {doc ? (
                <div className="rounded-lg border border-border overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                    <div className="flex items-center gap-2">
                      <File className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium text-foreground">{doc.file_name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        ({(doc.file_size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        asChild
                      >
                        <a href={getPublicUrl(doc.file_path)} target="_blank" rel="noopener noreferrer">
                          {format === "pdf" ? (
                            <ExternalLink className="w-3.5 h-3.5" />
                          ) : (
                            <Download className="w-3.5 h-3.5" />
                          )}
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteMutation.mutate(doc)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 text-[10px]"
                        onClick={() => handleUpload(format)}
                        disabled={uploading === format}
                      >
                        <Upload className="w-3 h-3" /> Replace
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  {format === "pdf" ? (
                    <iframe
                      src={getPublicUrl(doc.file_path)}
                      className="w-full h-[500px] bg-card"
                      title={doc.file_name}
                    />
                  ) : (
                    <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto bg-card text-card-foreground max-h-[500px] overflow-y-auto">
                      {textContents[format] || (
                        <span className="text-muted-foreground animate-pulse">Loading...</span>
                      )}
                    </pre>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleUpload(format)}
                  disabled={uploading === format}
                  className="w-full rounded-lg border-2 border-dashed border-border hover:border-muted-foreground/50 transition-colors p-8 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Upload className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {uploading === format ? "Uploading..." : `Upload ${config.label} file`}
                  </span>
                  <span className="text-xs">
                    Accepts {config.accept} files
                  </span>
                </button>
              )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
