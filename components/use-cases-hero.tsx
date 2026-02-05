import { Database } from "lucide-react"

export function UseCasesHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-30" />
      
      <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Redis LangCache</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Semantic Caching Use Cases
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
          A guide for Solution Architects and Sales teams to identify ideal customers
        </p>
      </div>
    </section>
  )
}
