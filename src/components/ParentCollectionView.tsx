import { ApiCollection } from "@/data/sampleSpecs";

function countEndpoints(col: ApiCollection): number {
  return col.endpoints.length + (col.children ?? []).reduce((sum, c) => sum + countEndpoints(c), 0);
}
import { Globe, Tag, Pencil, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirm } from "./DeleteConfirm";
import { useDeleteCollection } from "@/hooks/useApiData";
import { toast } from "sonner";

interface ParentCollectionViewProps {
  collection: ApiCollection;
  onSelectCollection: (id: string) => void;
  onEditCollection: () => void;
  onCollectionDeleted: () => void;
}

export function ParentCollectionView({
  collection,
  onSelectCollection,
  onEditCollection,
  onCollectionDeleted,
}: ParentCollectionViewProps) {
  const deleteCollection = useDeleteCollection();
  const children = collection.children ?? [];

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
              description={`This will permanently delete "${collection.name}" and all its child collections.`}
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

      <h3 className="text-sm font-semibold text-foreground mb-3">
        Collections ({children.length})
      </h3>

      <div className="grid gap-3">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => onSelectCollection(child.id)}
            className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:bg-accent transition-all text-left group hover:shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-foreground mb-1">{child.name}</h3>
              <p className="text-xs text-muted-foreground">{child.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground">
                {countEndpoints(child)} endpoints
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
