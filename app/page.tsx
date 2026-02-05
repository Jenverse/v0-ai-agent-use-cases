import { UseCasesHero } from "@/components/use-cases-hero"
import { UseCaseChatDemo } from "@/components/use-case-chat-demo"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <UseCasesHero />
      <UseCaseChatDemo />
      <Footer />
    </main>
  )
}
