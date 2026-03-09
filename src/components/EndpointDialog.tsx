import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddEndpoint, useUpdateEndpoint } from "@/hooks/useApiData";
import { ApiEndpoint, HttpMethod } from "@/data/sampleSpecs";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface EndpointDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collectionId: string;
  endpoint?: ApiEndpoint | null;
}

const METHODS: HttpMethod[] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export function EndpointDialog({ open, onOpenChange, collectionId, endpoint }: EndpointDialogProps) {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [path, setPath] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [responseExample, setResponseExample] = useState("{}");
  const [tagsInput, setTagsInput] = useState("");
  const [parameters, setParameters] = useState<{ name: string; type: string; required: boolean; description: string }[]>([]);

  const addMutation = useAddEndpoint();
  const updateMutation = useUpdateEndpoint();
  const isEditing = !!endpoint;

  useEffect(() => {
    if (endpoint) {
      setMethod(endpoint.method);
      setPath(endpoint.path);
      setSummary(endpoint.summary);
      setDescription(endpoint.description);
      setRequestBody(endpoint.requestBody ?? "");
      setResponseExample(endpoint.responseExample);
      setTagsInput(endpoint.tags.join(", "));
      setParameters(endpoint.parameters.map((p) => ({ ...p })));
    } else {
      setMethod("GET");
      setPath("");
      setSummary("");
      setDescription("");
      setRequestBody("");
      setResponseExample("{}");
      setTagsInput("");
      setParameters([]);
    }
  }, [endpoint, open]);

  const addParam = () => {
    setParameters([...parameters, { name: "", type: "string", required: false, description: "" }]);
  };

  const removeParam = (i: number) => {
    setParameters(parameters.filter((_, idx) => idx !== i));
  };

  const updateParam = (i: number, field: string, value: string | boolean) => {
    setParameters(parameters.map((p, idx) => (idx === i ? { ...p, [field]: value } : p)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedPath = path.trim();
    if (!trimmedPath) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const validParams = parameters.filter((p) => p.name.trim());

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: endpoint.id,
          method,
          path: trimmedPath,
          summary: summary.trim(),
          description: description.trim(),
          parameters: validParams,
          requestBody: requestBody.trim() || undefined,
          responseExample: responseExample.trim() || "{}",
          tags,
        });
        toast.success("Endpoint updated");
      } else {
        await addMutation.mutateAsync({
          collectionId,
          method,
          path: trimmedPath,
          summary: summary.trim(),
          description: description.trim(),
          parameters: validParams,
          requestBody: requestBody.trim() || undefined,
          responseExample: responseExample.trim() || "{}",
          tags,
        });
        toast.success("Endpoint created");
      }
      onOpenChange(false);
    } catch {
      toast.error("Failed to save endpoint");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Endpoint" : "New Endpoint"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Method + Path */}
          <div className="flex gap-2">
            <div className="w-28">
              <Label>Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)}>
                <SelectTrigger className="font-mono text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {METHODS.map((m) => (
                    <SelectItem key={m} value={m} className="font-mono text-xs">{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="ep-path">Path</Label>
              <Input id="ep-path" value={path} onChange={(e) => setPath(e.target.value)} placeholder="/users/:id" maxLength={300} className="font-mono text-xs" required />
            </div>
          </div>

          <div>
            <Label htmlFor="ep-summary">Summary</Label>
            <Input id="ep-summary" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Get user by ID" maxLength={200} />
          </div>

          <div>
            <Label htmlFor="ep-desc">Description</Label>
            <Textarea id="ep-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed description..." maxLength={2000} rows={2} />
          </div>

          {/* Parameters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Parameters</Label>
              <Button type="button" variant="outline" size="sm" onClick={addParam} className="h-7 text-xs gap-1">
                <Plus className="w-3 h-3" /> Add
              </Button>
            </div>
            {parameters.map((param, i) => (
              <div key={i} className="flex gap-1.5 mb-1.5 items-start">
                <Input value={param.name} onChange={(e) => updateParam(i, "name", e.target.value)} placeholder="name" className="font-mono text-xs flex-1" maxLength={100} />
                <Input value={param.type} onChange={(e) => updateParam(i, "type", e.target.value)} placeholder="type" className="font-mono text-xs w-20" maxLength={50} />
                <Button type="button" variant={param.required ? "default" : "outline"} size="sm" className="h-9 text-[10px] w-14 shrink-0" onClick={() => updateParam(i, "required", !param.required)}>
                  {param.required ? "Req" : "Opt"}
                </Button>
                <Input value={param.description} onChange={(e) => updateParam(i, "description", e.target.value)} placeholder="description" className="text-xs flex-1" maxLength={500} />
                <Button type="button" variant="ghost" size="sm" className="h-9 w-9 shrink-0" onClick={() => removeParam(i)}>
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>

          {/* Request Body */}
          <div>
            <Label htmlFor="ep-body">Request Body (JSON)</Label>
            <Textarea id="ep-body" value={requestBody} onChange={(e) => setRequestBody(e.target.value)} placeholder='{"key": "value"}' rows={3} className="font-mono text-xs" maxLength={5000} />
          </div>

          {/* Response Example */}
          <div>
            <Label htmlFor="ep-response">Response Example (JSON)</Label>
            <Textarea id="ep-response" value={responseExample} onChange={(e) => setResponseExample(e.target.value)} placeholder='{"id": "..."}' rows={3} className="font-mono text-xs" maxLength={5000} />
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="ep-tags">Tags (comma-separated)</Label>
            <Input id="ep-tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="users, auth" maxLength={200} />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending || !path.trim()}>
              {isPending ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
