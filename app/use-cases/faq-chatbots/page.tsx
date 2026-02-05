import { Bot } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function FAQChatbotsPage() {
  return (
    <UseCasePageLayout
      title="FAQ Chatbots"
      icon={<Bot className="w-7 h-7 text-emerald-500" />}
      isGoodFit={true}
      keyPoints={[
        {
          title: "Frequently = Perfect for Caching",
          description: "The 'F' in FAQ stands for 'Frequently'. These questions exist because they're asked repeatedly. High repetition = high cache hit rates."
        },
        {
          title: "Predictable Question Set",
          description: "Most businesses have a known set of common questions. Business hours, pricing, policies, locations — these rarely change but are asked constantly."
        },
        {
          title: "Multiple Phrasing Patterns",
          description: "\"What are your hours?\" \"When do you open?\" \"What time do you close?\" — dozens of ways to ask the same thing, all cacheable to one response."
        },
        {
          title: "Cost-Effective at Scale",
          description: "A website chatbot might receive thousands of questions daily. Without caching, every question hits the LLM. With caching, most are instant cache hits."
        },
      ]}
      scenario="Business website chatbot answering common visitor questions"
      conversation={[
        { role: "user", userName: "User 1", content: "What are your business hours?" },
        { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST.\n\nClosed on weekends and major holidays.\n\nOur support team typically responds within 2 hours during business hours. For urgent matters, you can reach us at support@company.com.", cached: false },
        { role: "user", userName: "User 2", content: "When are you guys open?" },
        { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST.\n\nClosed on weekends and major holidays.\n\nOur support team typically responds within 2 hours during business hours. For urgent matters, you can reach us at support@company.com.", cached: true },
        { role: "user", userName: "User 3", content: "What time do you close?" },
        { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST.\n\nClosed on weekends and major holidays.\n\nOur support team typically responds within 2 hours during business hours. For urgent matters, you can reach us at support@company.com.", cached: true },
      ]}
      bottomLine="FAQ chatbots are the textbook use case for semantic caching. High volume, repetitive questions, stable answers. If your prospect has an FAQ chatbot, semantic caching will immediately deliver value."
    />
  )
}
