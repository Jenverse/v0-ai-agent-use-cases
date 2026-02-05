import { XCircle, Code, RefreshCw, MessageCircle, Shield, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const badUseCases = [
  {
    icon: Code,
    title: "Code Generation & Debugging",
    description: "Coding tasks require precise, context-specific responses. Small differences in code context can lead to vastly different correct answers.",
    reason: "High accuracy requirements"
  },
  {
    icon: MessageCircle,
    title: "Multi-Turn Conversations",
    description: "Complex dialogues where context evolves turn-by-turn. Each response depends heavily on the full conversation history.",
    reason: "Context-dependent"
  },
  {
    icon: RefreshCw,
    title: "Real-Time Data Queries",
    description: "Questions about live data (stock prices, weather, news) need fresh responses. Cached answers quickly become stale and incorrect.",
    reason: "Data freshness required"
  },
  {
    icon: Sparkles,
    title: "Creative Content Generation",
    description: "Tasks requiring unique, novel outputs each time — like brainstorming, creative writing, or generating varied marketing copy.",
    reason: "Uniqueness expected"
  },
  {
    icon: Shield,
    title: "Medical Triaging",
    description: "Symptom assessment where nuanced accuracy is critical. Even semantically similar symptoms may have vastly different causes and require distinct guidance.",
    reason: "Individual evaluation required"
  }
]

export function BadFitSection() {
  return (
    <section className="py-20 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="w-6 h-6 text-destructive" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Not Ideal For</h2>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          These scenarios have inherent limitations with semantic caching due to strict accuracy needs, context dependency, or freshness requirements.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badUseCases.map((useCase, index) => (
            <Card key={index} className="bg-card border-border hover:border-destructive/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-destructive" />
                </div>
                <CardTitle className="text-foreground">{useCase.title}</CardTitle>
                <div className="inline-block px-2 py-1 rounded text-xs font-medium bg-destructive/10 text-destructive w-fit">
                  {useCase.reason}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
