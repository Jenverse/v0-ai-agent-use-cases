import { Sparkles } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function CreativeWritingPage() {
  return (
    <UseCasePageLayout
      title="Creative Writing"
      icon={<Sparkles className="w-7 h-7 text-red-500" />}
      isGoodFit={false}
      keyPoints={[
        {
          title: "Uniqueness is the Point",
          description: "Users asking for creative content expect original output. Returning the same tagline to every user defeats the entire purpose of creative generation."
        },
        {
          title: "Duplicate Content Problem",
          description: "If two coffee shop owners both get the same cached slogan, neither has unique branding. This creates real business problems for users."
        },
        {
          title: "No 'Correct' Answer",
          description: "Unlike factual questions, creative requests don't have a single right answer. Users want variety and freshness, not consistency."
        },
        {
          title: "Brand Differentiation",
          description: "Marketing and branding content exists to differentiate. Cached responses would give competitors identical messaging."
        },
      ]}
      scenario="Marketing assistant generating taglines"
      conversation={[
        { role: "user", userName: "User 1", content: "Write me a tagline for my coffee shop" },
        { role: "assistant", content: "\"Wake up to something wonderful.\"", cached: false },
        { role: "user", userName: "User 2", content: "Give me a slogan for my cafe" },
        { role: "assistant", content: "USELESS if cached!\n\nUser 2 would receive the exact same tagline as User 1.\n\nNow two competing coffee shops have identical branding. This defeats the entire purpose of creative generation.", cached: false },
      ]}
      bottomLine="Creative writing exists to produce unique, original content. Caching transforms 'creative generation' into 'copy-paste'."
      customerExamples={[
        "Jasper AI",
        "Copy.ai",
        "Writesonic",
        "Midjourney Prompts",
        "Ad Copy Generators",
        "Story Writing Apps"
      ]}
    />
  )
}
