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
          description: "Voice input is messy. People say 'um', 'like', pause mid-sentence, and phrase things casually. Semantic caching treats all these variations as the same intent."
        },
        {
          title: "Same Movie, Countless Ways to Ask",
          description: "\"Play that new action movie\" vs \"Show me the latest action film\" vs \"I wanna watch an action flick\" — same request, completely different words."
        },
        {
          title: "Accent & Pronunciation Tolerance",
          description: "Speech-to-text produces different text based on accents and speaking styles. Semantic matching handles 'gonna' and 'going to' as equivalent."
        },
        {
          title: "Instant Response is Critical",
          description: "Voice users expect an answer immediately — no one wants to stare at a TV waiting. Cached responses deliver near-instant results."
        },
      ]}
      scenario="A Vizio SmartCast TV where users search for movies using voice remote"
      conversation={[
        { role: "user", userName: "User 1", content: "Show me some good action movies" },
        { role: "assistant", content: "Here are popular action movies for you:\n\n1. John Wick: Chapter 4\n2. Mission: Impossible - Dead Reckoning\n3. Extraction 2\n4. The Equalizer 3\n\nSay a title to start watching.", cached: false },
        { role: "user", userName: "User 2", content: "Um, I wanna watch like, an action film" },
        { role: "assistant", content: "Here are popular action movies for you:\n\n1. John Wick: Chapter 4\n2. Mission: Impossible - Dead Reckoning\n3. Extraction 2\n4. The Equalizer 3\n\nSay a title to start watching.", cached: true },
        { role: "user", userName: "User 3", content: "Find me action movies to watch tonight" },
        { role: "assistant", content: "Here are popular action movies for you:\n\n1. John Wick: Chapter 4\n2. Mission: Impossible - Dead Reckoning\n3. Extraction 2\n4. The Equalizer 3\n\nSay a title to start watching.", cached: true },
      ]}
      bottomLine=""
      customerExamples={[
        "Vizio SmartCast TV",
        "Roku Voice Remote",
        "Fire TV Stick",
        "Apple TV Siri",
        "Samsung Smart TV",
        "Google Chromecast"
      ]}
    />
  )
}
