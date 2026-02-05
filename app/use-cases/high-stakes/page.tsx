import { Shield } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function HighStakesPage() {
  return (
    <UseCasePageLayout
      title="Medical / Legal / Financial"
      icon={<Shield className="w-7 h-7 text-red-500" />}
      isGoodFit={false}
      keyPoints={[
        {
          title: "Similar Symptoms, Different Causes",
          description: "\"Chest pain\" could indicate heartburn, anxiety, or a heart attack. Each requires a different response. Semantic similarity doesn't mean the same diagnosis applies."
        },
        {
          title: "Individual Context Matters",
          description: "Medical/legal/financial advice depends heavily on individual circumstances — age, history, jurisdiction, risk tolerance. Generic cached answers ignore crucial details."
        },
        {
          title: "Liability Concerns",
          description: "Incorrect cached advice in high-stakes domains can have serious consequences. The risk of harm from a wrong cached response far outweighs the cost savings."
        },
        {
          title: "Professional Standards",
          description: "These fields have professional and regulatory standards requiring individual assessment. Cached responses may not meet duty-of-care requirements."
        },
      ]}
      scenario="Health chatbot receiving symptom reports"
      conversation={[
        { role: "user", userName: "User 1", content: "I have chest pain and shortness of breath" },
        { role: "assistant", content: "These symptoms require immediate medical attention. Please call emergency services (911) or visit the nearest emergency room right away.", cached: false },
        { role: "user", userName: "User 2", content: "My chest feels tight and I can't breathe well" },
        { role: "assistant", content: "DANGEROUS if cached!\n\nWhile the symptoms sound similar, User 2 could have:\n• Anxiety/panic attack\n• Asthma flare-up\n• Cardiac event\n• Pulmonary issue\n\nEach requires different guidance. A cached \"call 911\" response might be wrong for an anxiety attack; missing a heart attack by suggesting breathing exercises could be fatal.", cached: false },
      ]}
      bottomLine="When lives, liberty, or livelihoods are at stake, every query deserves fresh, careful evaluation. The cost of a wrong cached answer is too high."
      customerExamples={[
        "Telehealth Symptom Checkers",
        "Legal Document Review",
        "Financial Advisors AI",
        "Insurance Claim Bots",
        "Drug Interaction Checkers",
        "Tax Advice Chatbots"
      ]}
    />
  )
}
