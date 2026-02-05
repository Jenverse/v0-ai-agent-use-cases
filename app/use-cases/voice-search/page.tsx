import { Mic } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function VoiceSearchPage() {
  return (
    <UseCasePageLayout
      title="Voice Search"
      icon={<Mic className="w-7 h-7 text-emerald-500" />}
      isGoodFit={true}
      keyPoints={[
        {
          title: "Natural Speech Variations",
          description: "Voice input is inherently messy. People use filler words ('um', 'like'), pause mid-sentence, and phrase things casually. Semantic caching handles all these variations."
        },
        {
          title: "Same Intent, Different Words",
          description: "\"Find Italian restaurants\" vs \"I'm looking for, like, Italian food\" vs \"Where can I get pasta nearby\" — all the same intent expressed differently."
        },
        {
          title: "Accent & Pronunciation Tolerance",
          description: "Speech-to-text creates variations based on accents and pronunciation. Semantic matching handles \"gonna\" and \"going to\" as equivalent."
        },
        {
          title: "Latency-Critical Applications",
          description: "Voice interfaces demand instant responses. Users won't wait 2-3 seconds for an LLM. Cached responses deliver sub-100ms answers."
        },
      ]}
      scenario="Voice assistant helping users find nearby restaurants"
      conversation={[
        { role: "user", userName: "User 1", content: "Find me Italian restaurants nearby" },
        { role: "assistant", content: "Here are the top Italian restaurants near you:\n\n1. Bella Italia (0.3 mi) — 4.5 stars\n2. Tony's Trattoria (0.5 mi) — 4.3 stars\n3. Pasta House (0.8 mi) — 4.4 stars\n\nWould you like directions to any of these?", cached: false },
        { role: "user", userName: "User 2", content: "Um, I'm looking for like, Italian food around here?" },
        { role: "assistant", content: "Here are the top Italian restaurants near you:\n\n1. Bella Italia (0.3 mi) — 4.5 stars\n2. Tony's Trattoria (0.5 mi) — 4.3 stars\n3. Pasta House (0.8 mi) — 4.4 stars\n\nWould you like directions to any of these?", cached: true },
        { role: "user", userName: "User 3", content: "Show me some Italian places to eat" },
        { role: "assistant", content: "Here are the top Italian restaurants near you:\n\n1. Bella Italia (0.3 mi) — 4.5 stars\n2. Tony's Trattoria (0.5 mi) — 4.3 stars\n3. Pasta House (0.8 mi) — 4.4 stars\n\nWould you like directions to any of these?", cached: true },
      ]}
      bottomLine="Voice queries have the highest variation rate of any input type. Filler words, casual phrasing, and speech patterns differ wildly — but the underlying intent stays the same. Perfect for semantic caching."
    />
  )
}
