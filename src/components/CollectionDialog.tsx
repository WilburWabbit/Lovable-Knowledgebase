import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAddCollection, useUpdateCollection } from "@/hooks/useApiData";
import { ApiCollection } from "@/data/sampleSpecs";
import { toast } from "sonner";

interface CollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collection?: ApiCollection | null;
}

export function CollectionDialog({ open, onOpenChange, collection }: CollectionDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [version, setVersion] = useState("1.0.0");

  const addMutation = useAddCollection();
  const updateMutation = useUpdateCollection();
  const isEditing = !!collection;

  useEffect(() => {
    if (collection) {
      setName(collection.name);
      setDescription(collection.description);
      setBaseUrl(collection.baseUrl);
      setVersion(collection.version);
    } else {
      setName("");
      setDescription("");
      setBaseUrl("");
      setVersion("1.0.0");
    }
  }, [collection, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: collection.id,
          name: trimmedName,
          description: description.trim(),
          baseUrl: baseUrl.trim(),
          version: version.trim(),
        });
        toast.success("Collection updated");
      } else {
        await addMutation.mutateAsync({
          name: trimmedName,
          description: description.trim(),
          baseUrl: baseUrl.trim(),
          version: version.trim(),
        });
        toast.success("Collection created");
      }
      onOpenChange(false);
    } catch {
      toast.error("Failed to save collection");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Collection" : "New Collection"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="col-name">Name</Label>
            <Input id="col-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Users API" maxLength={100} required />
          </div>
          <div>
            <Label htmlFor="col-desc">Description</Label>
            <Textarea id="col-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Core user management endpoints" maxLength={500} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="col-url">Base URL</Label>
              <Input id="col-url" value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://api.example.com/v1" maxLength={500} className="font-mono text-xs" />
            </div>
            <div>
              <Label htmlFor="col-ver">Version</Label>
              <Input id="col-ver" value={version} onChange={(e) => setVersion(e.target.value)} placeholder="1.0.0" maxLength={20} className="font-mono text-xs" />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? "Saving..." : isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
