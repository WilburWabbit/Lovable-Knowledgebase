import { useState } from "react";
import { useCollections } from "@/hooks/useApiData";
import { AppSidebar } from "@/components/AppSidebar";
import { EndpointDetail } from "@/components/EndpointDetail";
import { CollectionOverview } from "@/components/CollectionOverview";
import { WelcomeView } from "@/components/WelcomeView";
import { SeedButton } from "@/components/SeedButton";

const Index = () => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [activeEndpointId, setActiveEndpointId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12">
          {activeEndpoint && activeCollection ? (
            <EndpointDetail endpoint={activeEndpoint} collection={activeCollection} />
          ) : activeCollection ? (
            <CollectionOverview
              collection={activeCollection}
              onSelectEndpoint={(epId) => handleSelectEndpoint(activeCollection.id, epId)}
            />
          ) : (
            <WelcomeView
              collections={collections}
              onSelectCollection={handleSelectCollection}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
