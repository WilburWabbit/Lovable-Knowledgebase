import { useState } from "react";
import { useCollections } from "@/hooks/useApiData";
import { AppSidebar } from "@/components/AppSidebar";
import { EndpointDetail } from "@/components/EndpointDetail";
import { CollectionOverview } from "@/components/CollectionOverview";
import { WelcomeView } from "@/components/WelcomeView";
import { CollectionDialog } from "@/components/CollectionDialog";
import { EndpointDialog } from "@/components/EndpointDialog";
import { ApiCollection, ApiEndpoint } from "@/data/sampleSpecs";

const Index = () => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [activeEndpointId, setActiveEndpointId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog state
  const [collectionDialogOpen, setCollectionDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<ApiCollection | null>(null);
  const [endpointDialogOpen, setEndpointDialogOpen] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState<ApiEndpoint | null>(null);

  const { data: collections = [], isLoading } = useCollections();

  const activeCollection = collections.find((c) => c.id === activeCollectionId) ?? null;
  const activeEndpoint = activeCollection?.endpoints.find((e) => e.id === activeEndpointId) ?? null;

  const handleSelectCollection = (id: string) => {
    setActiveCollectionId((prev) => (prev === id ? null : id));
    setActiveEndpointId(null);
  };

  const handleSelectEndpoint = (collectionId: string, endpointId: string) => {
    setActiveCollectionId(collectionId);
    setActiveEndpointId(endpointId);
  };

  // Collection CRUD
  const openNewCollection = () => {
    setEditingCollection(null);
    setCollectionDialogOpen(true);
  };

  const openEditCollection = () => {
    if (activeCollection) {
      setEditingCollection(activeCollection);
      setCollectionDialogOpen(true);
    }
  };

  // Endpoint CRUD
  const openNewEndpoint = () => {
    setEditingEndpoint(null);
    setEndpointDialogOpen(true);
  };

  const openEditEndpoint = (endpointId: string) => {
    const ep = activeCollection?.endpoints.find((e) => e.id === endpointId) ?? null;
    setEditingEndpoint(ep);
    setEndpointDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground animate-pulse">Loading knowledge base...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        collections={collections}
        activeCollectionId={activeCollectionId}
        activeEndpointId={activeEndpointId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCollection={handleSelectCollection}
        onSelectEndpoint={handleSelectEndpoint}
        onNewCollection={openNewCollection}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12">
          {activeEndpoint && activeCollection ? (
            <EndpointDetail
              endpoint={activeEndpoint}
              collection={activeCollection}
              onEdit={() => {
                setEditingEndpoint(activeEndpoint);
                setEndpointDialogOpen(true);
              }}
              onDeleted={() => setActiveEndpointId(null)}
            />
          ) : activeCollection ? (
            <CollectionOverview
              collection={activeCollection}
              onSelectEndpoint={(epId) => handleSelectEndpoint(activeCollection.id, epId)}
              onEditCollection={openEditCollection}
              onNewEndpoint={openNewEndpoint}
              onEditEndpoint={openEditEndpoint}
              onCollectionDeleted={() => {
                setActiveCollectionId(null);
                setActiveEndpointId(null);
              }}
            />
          ) : (
            <WelcomeView
              collections={collections}
              onSelectCollection={handleSelectCollection}
              onNewCollection={openNewCollection}
            />
          )}
        </div>
      </main>

      {/* Dialogs */}
      <CollectionDialog
        open={collectionDialogOpen}
        onOpenChange={setCollectionDialogOpen}
        collection={editingCollection}
      />
      {activeCollectionId && (
        <EndpointDialog
          open={endpointDialogOpen}
          onOpenChange={setEndpointDialogOpen}
          collectionId={activeCollectionId}
          endpoint={editingEndpoint}
        />
      )}
    </div>
  );
};

export default Index;
