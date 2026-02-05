import { Database } from "lucide-react"

export function UseCasesHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-30" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Redis LangCache</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
          Semantic Caching for{" "}
          <span className="text-primary">AI Agents</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Cache responses for semantically similar questions — users ask the same thing in countless ways
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span>Instant Responses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span>Lower API Costs</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span>Scale Effortlessly</span>
          </div>
        </div>
      </div>
    </section>
  )
}
