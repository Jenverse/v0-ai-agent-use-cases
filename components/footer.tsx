import { Database } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          <span className="font-semibold text-foreground">Redis LangCache</span>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          Semantic Caching for AI Applications • Reduce Costs • Accelerate Responses
        </p>

        <div className="text-sm text-muted-foreground">
          Use Cases Overview
        </div>
      </div>
    </footer>
  )
}
