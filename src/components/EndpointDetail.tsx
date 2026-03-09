import { ApiEndpoint, ApiCollection } from "@/data/sampleSpecs";
import { MethodBadge } from "./MethodBadge";
import { Copy, Check, Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteConfirm } from "./DeleteConfirm";
import { useDeleteEndpoint } from "@/hooks/useApiData";
import { toast } from "sonner";
import { EndpointDocuments } from "./EndpointDocuments";

interface EndpointDetailProps {
  endpoint: ApiEndpoint;
  collection: ApiCollection;
  onEdit: () => void;
  onDeleted: () => void;
}

function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto bg-card text-card-foreground">
        {code}
      </pre>
    </div>
  );
}

export function EndpointDetail({ endpoint, collection, onEdit, onDeleted }: EndpointDetailProps) {
  const deleteEndpoint = useDeleteEndpoint();

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{collection.name}</span>
            <span>/</span>
            <span className="font-mono">v{collection.version}</span>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs" onClick={onEdit}>
              <Pencil className="w-3 h-3" /> Edit
            </Button>
            <DeleteConfirm
              title="Delete endpoint?"
              description={`Delete ${endpoint.method} ${endpoint.path}?`}
              onConfirm={async () => {
                await deleteEndpoint.mutateAsync(endpoint.id);
                toast.success("Endpoint deleted");
                onDeleted();
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <MethodBadge method={endpoint.method} />
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{endpoint.summary}</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted font-mono text-sm text-foreground">
          <span className="text-muted-foreground">{collection.baseUrl}</span>
          <span className="font-semibold">{endpoint.path}</span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground leading-relaxed">{endpoint.description}</p>
      </div>

      {/* Tags */}
      {endpoint.tags.length > 0 && (
        <div className="flex gap-2 mb-8">
          {endpoint.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-secondary text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Parameters */}
      {endpoint.parameters.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-3">Parameters</h3>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted text-muted-foreground text-xs">
                  <th className="text-left px-4 py-2 font-medium">Name</th>
                  <th className="text-left px-4 py-2 font-medium">Type</th>
                  <th className="text-left px-4 py-2 font-medium">Required</th>
                  <th className="text-left px-4 py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {endpoint.parameters.map((param) => (
                  <tr key={param.name} className="border-t border-border">
                    <td className="px-4 py-2.5 font-mono text-xs font-medium text-foreground">{param.name}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{param.type}</td>
                    <td className="px-4 py-2.5">
                      {param.required ? (
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-method-delete">Required</span>
                      ) : (
                        <span className="text-[10px] text-muted-foreground">Optional</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Body */}
      {endpoint.requestBody && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground mb-3">Request Body</h3>
          <CodeBlock code={endpoint.requestBody} label="JSON" />
        </div>
      )}

      {/* Response */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-foreground mb-3">Response Example</h3>
        <CodeBlock code={endpoint.responseExample} label="200 OK" />
      </div>
    </div>
  );
}
