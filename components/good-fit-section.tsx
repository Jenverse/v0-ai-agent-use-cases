import { CheckCircle2, MessageSquare, Search, HelpCircle, Mic, Bot } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const goodUseCases = [
  {
    icon: HelpCircle,
    title: "Product Q&A",
    description: "Cache answers to common product questions. Users often ask similar things in different ways — semantic caching handles paraphrased queries efficiently.",
    highlight: "High cache hit rate"
  },
  {
    icon: MessageSquare,
    title: "Customer Support",
    description: "Support chatbots handle repetitive queries phrased in countless ways. Cache responses and deliver instant, consistent answers at scale.",
    highlight: "Up to 68% fewer API calls"
  },
  {
    icon: Mic,
    title: "Voice Search",
    description: "Voice queries are naturally varied. Semantic caching understands intent across different phrasings, perfect for voice-first AI applications.",
    highlight: "Handles natural variations"
  },
  {
    icon: Bot,
    title: "AI Assistants & Chatbots",
    description: "Optimize conversational AI by caching common responses. Great for FAQ bots, onboarding assistants, and internal knowledge bases.",
    highlight: "Faster response times"
  },
  {
    icon: Search,
    title: "RAG Applications",
    description: "Enhance retrieval-augmented generation by caching responses to similar document queries, reducing redundant LLM calls.",
    highlight: "Cost-effective retrieval"
  }
]

export function GoodFitSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Good Fit Use Cases</h2>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
          These scenarios benefit most from semantic caching due to high query repetition and tolerance for semantically similar responses.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goodUseCases.map((useCase, index) => (
            <Card key={index} className="bg-card border-border hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <useCase.icon className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-foreground">{useCase.title}</CardTitle>
                <div className="inline-block px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent w-fit">
                  {useCase.highlight}
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
