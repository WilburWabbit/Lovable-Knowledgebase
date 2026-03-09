import { useState } from "react";
import { sampleCollections } from "@/data/sampleSpecs";
import { AppSidebar } from "@/components/AppSidebar";
import { EndpointDetail } from "@/components/EndpointDetail";
import { CollectionOverview } from "@/components/CollectionOverview";
import { WelcomeView } from "@/components/WelcomeView";

const Index = () => {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [activeEndpointId, setActiveEndpointId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCollection = sampleCollections.find((c) => c.id === activeCollectionId) ?? null;
  const activeEndpoint = activeCollection?.endpoints.find((e) => e.id === activeEndpointId) ?? null;

  const handleSelectCollection = (id: string) => {
    setActiveCollectionId((prev) => (prev === id ? null : id));
    setActiveEndpointId(null);
  };

  const handleSelectEndpoint = (collectionId: string, endpointId: string) => {
    setActiveCollectionId(collectionId);
    setActiveEndpointId(endpointId);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        collections={sampleCollections}
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
              collections={sampleCollections}
              onSelectCollection={handleSelectCollection}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
