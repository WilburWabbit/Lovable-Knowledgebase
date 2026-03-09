import { ApiCollection } from "@/data/sampleSpecs";
import { BookOpen, ArrowRight } from "lucide-react";

interface WelcomeViewProps {
  collections: ApiCollection[];
  onSelectCollection: (id: string) => void;
}

export function WelcomeView({ collections, onSelectCollection }: WelcomeViewProps) {
  const totalEndpoints = collections.reduce((acc, c) => acc + c.endpoints.length, 0);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-7 h-7 text-primary-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
        API Knowledge Base
      </h1>
      <p className="text-muted-foreground mb-10 text-lg">
        Your source of truth for {totalEndpoints} endpoints across {collections.length} APIs.
        <br />
        Select a collection to get started.
      </p>

      <div className="grid gap-3">
        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => onSelectCollection(col.id)}
            className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:bg-accent transition-all text-left group hover:shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-foreground mb-1">{col.name}</h3>
              <p className="text-xs text-muted-foreground">{col.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground">
                {col.endpoints.length} endpoints
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
