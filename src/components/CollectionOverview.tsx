import { ApiCollection } from "@/data/sampleSpecs";
import { MethodBadge } from "./MethodBadge";
import { Globe, Tag, Pencil, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirm } from "./DeleteConfirm";
import { useDeleteCollection, useDeleteEndpoint } from "@/hooks/useApiData";
import { toast } from "sonner";

interface CollectionOverviewProps {
  collection: ApiCollection;
  onSelectEndpoint: (endpointId: string) => void;
  onEditCollection: () => void;
  onNewEndpoint: () => void;
  onEditEndpoint: (endpointId: string) => void;
  onCollectionDeleted: () => void;
}

export function CollectionOverview({
  collection,
  onSelectEndpoint,
  onEditCollection,
  onNewEndpoint,
  onEditEndpoint,
  onCollectionDeleted,
}: CollectionOverviewProps) {
  const deleteCollection = useDeleteCollection();
  const deleteEndpoint = useDeleteEndpoint();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">{collection.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">{collection.description}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs" onClick={onEditCollection}>
              <Pencil className="w-3 h-3" /> Edit
            </Button>
            <DeleteConfirm
              title="Delete collection?"
              description={`This will permanently delete "${collection.name}" and all its endpoints.`}
              onConfirm={async () => {
                await deleteCollection.mutateAsync(collection.id);
                toast.success("Collection deleted");
                onCollectionDeleted();
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono">{collection.baseUrl || "—"}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span className="font-mono">v{collection.version}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">
          Endpoints ({collection.endpoints.length})
        </h3>
        <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs" onClick={onNewEndpoint}>
          <Plus className="w-3 h-3" /> Add Endpoint
        </Button>
      </div>

      <div className="space-y-2">
        {collection.endpoints.map((ep) => (
          <div
            key={ep.id}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors group"
          >
            <button
              onClick={() => onSelectEndpoint(ep.id)}
              className="flex items-center gap-3 flex-1 text-left min-w-0"
            >
              <MethodBadge method={ep.method} />
              <span className="font-mono text-sm text-foreground truncate">{ep.path}</span>
              <span className="ml-auto text-xs text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                {ep.summary}
              </span>
            </button>
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <Button variant="ghost" size="sm" className="h-7 w-7" onClick={() => onEditEndpoint(ep.id)}>
                <Pencil className="w-3 h-3" />
              </Button>
              <DeleteConfirm
                title="Delete endpoint?"
                description={`Delete ${ep.method} ${ep.path}?`}
                onConfirm={async () => {
                  await deleteEndpoint.mutateAsync(ep.id);
                  toast.success("Endpoint deleted");
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
