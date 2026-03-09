import { Search, BookOpen, ChevronRight, Plus } from "lucide-react";
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
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-sidebar-accent flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-sidebar-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-semibold text-sidebar-primary tracking-tight">API Knowledge Base</h1>
            <p className="text-[10px] text-sidebar-muted tracking-wide uppercase">Source of Truth</p>
          </div>
          <ImportSpecButton
            variant="ghost"
            size="icon"
            onImported={onSelectCollection}
          />
          <button
            onClick={onNewCollection}
            className="w-7 h-7 rounded-md bg-sidebar-accent hover:bg-sidebar-ring/20 flex items-center justify-center transition-colors"
            title="New collection"
          >
            <Plus className="w-3.5 h-3.5 text-sidebar-primary" />
          </button>
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
        {collections.map((col) => {
          const isActive = activeCollectionId === col.id;
          const filteredEndpoints = col.endpoints.filter(
            (ep) =>
              !searchQuery ||
              ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
              ep.method.toLowerCase().includes(searchQuery.toLowerCase())
          );

          if (searchQuery && filteredEndpoints.length === 0) return null;

          return (
            <div key={col.id} className="mb-1">
              <button
                onClick={() => onSelectCollection(col.id)}
                className={`w-full flex items-center gap-2 px-5 py-2 text-left text-sm font-medium transition-colors hover:bg-sidebar-accent ${
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground"
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${isActive ? "rotate-90" : ""}`}
                />
                <span className="truncate">{col.name}</span>
                <span className="ml-auto text-[10px] text-sidebar-muted font-mono">
                  {filteredEndpoints.length}
                </span>
              </button>

              {isActive && (
                <div className="ml-5 border-l border-sidebar-border">
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
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-muted text-center">
          {collections.reduce((acc, c) => acc + c.endpoints.length, 0)} endpoints across{" "}
          {collections.length} APIs
        </p>
      </div>
    </aside>
  );
}
