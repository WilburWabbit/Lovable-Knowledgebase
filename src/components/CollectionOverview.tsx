import { ApiCollection } from "@/data/sampleSpecs";
import { MethodBadge } from "./MethodBadge";
import { Globe, Tag } from "lucide-react";

interface CollectionOverviewProps {
  collection: ApiCollection;
  onSelectEndpoint: (endpointId: string) => void;
}

export function CollectionOverview({ collection, onSelectEndpoint }: CollectionOverviewProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">{collection.name}</h2>
        <p className="text-sm text-muted-foreground mb-4">{collection.description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono">{collection.baseUrl}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span className="font-mono">v{collection.version}</span>
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-3">
        Endpoints ({collection.endpoints.length})
      </h3>

      <div className="space-y-2">
        {collection.endpoints.map((ep) => (
          <button
            key={ep.id}
            onClick={() => onSelectEndpoint(ep.id)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-card hover:bg-accent transition-colors text-left group"
          >
            <MethodBadge method={ep.method} />
            <span className="font-mono text-sm text-foreground">{ep.path}</span>
            <span className="ml-auto text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {ep.summary}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
