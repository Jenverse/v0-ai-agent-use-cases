import { UseCasesHero } from "@/components/use-cases-hero"
import { GoodFitSection } from "@/components/good-fit-section"
import { BadFitSection } from "@/components/bad-fit-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <UseCasesHero />
      <GoodFitSection />
      <BadFitSection />
      <Footer />
    </main>
  )
}
