import { useState } from "react";
import { Search, BookOpen, ChevronRight, ChevronDown, Plus, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImportSpecButton } from "./ImportSpecButton";
import { ApiCollection } from "@/data/sampleSpecs";

interface AppSidebarProps {
  collections: ApiCollection[];
  activeCollectionId: string | null;
  activeEndpointId: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCollection: (id: string) => void;
  onSelectEndpoint: (collectionId: string, endpointId: string) => void;
  onNewCollection: () => void;
}

function CollectionItem({
  col,
  activeCollectionId,
  activeEndpointId,
  searchQuery,
  onSelectCollection,
  onSelectEndpoint,
  depth = 0,
}: {
  col: ApiCollection;
  activeCollectionId: string | null;
  activeEndpointId: string | null;
  searchQuery: string;
  onSelectCollection: (id: string) => void;
  onSelectEndpoint: (collectionId: string, endpointId: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const isActive = activeCollectionId === col.id;
  const isParent = (col.children?.length ?? 0) > 0;

  const filteredEndpoints = col.endpoints.filter(
    (ep) =>
      !searchQuery ||
      ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ep.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasMatchingChildren = col.children?.some((child) =>
    child.endpoints.some(
      (ep) =>
        !searchQuery ||
        ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.method.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (searchQuery && filteredEndpoints.length === 0 && !hasMatchingChildren && !isParent) return null;

  const isExpanded = isActive || expanded || (searchQuery.length > 0 && (filteredEndpoints.length > 0 || hasMatchingChildren));

  if (isParent) {
    const totalEndpoints = (col.children ?? []).reduce((sum, c) => sum + c.endpoints.length, 0);
    return (
      <div className="mb-1">
        <button
          onClick={() => {
            setExpanded(!isExpanded);
            onSelectCollection(col.id);
          }}
          className={`w-full flex items-center gap-2 px-5 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-sidebar-accent ${
            isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
          }`}
          style={{ paddingLeft: `${20 + depth * 16}px` }}
        >
          <Layers className="w-4 h-4 shrink-0 text-sidebar-muted" />
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          )}
          <span className="truncate">{col.name}</span>
          <span className="ml-auto text-[10px] text-sidebar-muted font-mono">
            {totalEndpoints}
          </span>
        </button>
        {isExpanded && (
          <div className="ml-3 border-l border-sidebar-border">
            {(col.children ?? []).map((child) => (
              <CollectionItem
                key={child.id}
                col={child}
                activeCollectionId={activeCollectionId}
                activeEndpointId={activeEndpointId}
                searchQuery={searchQuery}
                onSelectCollection={onSelectCollection}
                onSelectEndpoint={onSelectEndpoint}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-0.5">
      <button
        onClick={() => onSelectCollection(col.id)}
        className={`w-full flex items-center gap-2 py-2 text-left text-sm font-medium transition-colors hover:bg-sidebar-accent ${
          isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
        }`}
        style={{ paddingLeft: `${20 + depth * 16}px`, paddingRight: 20 }}
      >
        <ChevronRight
          className={`w-3.5 h-3.5 transition-transform shrink-0 ${isActive ? "rotate-90" : ""}`}
        />
        <span className="truncate">{col.name}</span>
        <span className="ml-auto text-[10px] text-sidebar-muted font-mono">
          {filteredEndpoints.length}
        </span>
      </button>

      {isActive && (
        <div className="border-l border-sidebar-border" style={{ marginLeft: `${20 + depth * 16}px` }}>
          {filteredEndpoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => onSelectEndpoint(col.id, ep.id)}
              className={`w-full flex items-center gap-2 pl-4 pr-5 py-1.5 text-left text-xs transition-colors hover:bg-sidebar-accent ${
                activeEndpointId === ep.id
                  ? "text-sidebar-primary bg-sidebar-accent"
                  : "text-sidebar-foreground"
              }`}
            >
              <span
                className={`font-mono font-semibold text-[10px] w-10 shrink-0 ${
                  ep.method === "GET"
                    ? "text-method-get"
                    : ep.method === "POST"
                    ? "text-method-post"
                    : ep.method === "PUT"
                    ? "text-method-put"
                    : ep.method === "DELETE"
                    ? "text-method-delete"
                    : "text-method-patch"
                }`}
              >
                {ep.method}
              </span>
              <span className="truncate">{ep.summary}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function countAllEndpoints(collections: ApiCollection[]): number {
  return collections.reduce((acc, c) => acc + c.endpoints.length + countAllEndpoints(c.children ?? []), 0);
}

function countAllApis(collections: ApiCollection[]): number {
  return collections.reduce((acc, c) => {
    const isParent = (c.children?.length ?? 0) > 0;
    return acc + (isParent ? 0 : 1) + countAllApis(c.children ?? []);
  }, 0);
}

export function AppSidebar({
  collections,
  activeCollectionId,
  activeEndpointId,
  searchQuery,
  onSearchChange,
  onSelectCollection,
  onSelectEndpoint,
  onNewCollection,
}: AppSidebarProps) {
  return (
    <aside className="w-72 shrink-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border">
      {/* Header */}
      <div className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-sidebar-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-sidebar-primary tracking-tight">API Knowledge Base</h1>
            <p className="text-[10px] text-sidebar-muted tracking-wide uppercase">Source of Truth</p>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <ImportSpecButton
            variant="outline"
            size="sm"
            onImported={onSelectCollection}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onNewCollection}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            New Collection
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sidebar-muted" />
          <input
            type="text"
            placeholder="Search endpoints..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-sidebar-accent text-sidebar-accent-foreground placeholder:text-sidebar-muted text-sm pl-8 pr-3 py-2 rounded-lg border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
          />
        </div>
      </div>

      {/* Collections */}
      <nav className="flex-1 overflow-y-auto py-3">
        {collections.map((col) => (
          <CollectionItem
            key={col.id}
            col={col}
            activeCollectionId={activeCollectionId}
            activeEndpointId={activeEndpointId}
            searchQuery={searchQuery}
            onSelectCollection={onSelectCollection}
            onSelectEndpoint={onSelectEndpoint}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-muted text-center">
          {countAllEndpoints(collections)} endpoints across {countAllApis(collections)} APIs
        </p>
      </div>
    </aside>
  );
}
