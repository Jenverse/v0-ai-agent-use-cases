import { Search } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function RAGApplicationsPage() {
  return (
    <UseCasePageLayout
      title="RAG Applications"
      icon={<Search className="w-7 h-7 text-emerald-500" />}
      isGoodFit={true}
      keyPoints={[
        {
          title: "Double Cost Savings",
          description: "RAG involves both retrieval AND generation. Semantic caching skips both steps for similar queries — no vector search, no LLM call, instant response."
        },
        {
          title: "Knowledge Base Queries Repeat",
          description: "When employees search internal docs, they ask the same questions. \"What's our refund policy?\" gets asked by every new hire and every customer-facing team."
        },
        {
          title: "Document Content is Stable",
          description: "Policy documents, handbooks, and knowledge bases update infrequently. Cached answers remain accurate for extended periods."
        },
        {
          title: "Handles Phrasing Variations",
          description: "\"What's the refund policy?\" vs \"Can I get my money back?\" vs \"How do returns work?\" — all retrieve the same document section, all should return the same answer."
        },
      ]}
      scenario="Internal knowledge base for company policies"
      conversation={[
        { role: "user", userName: "User 1", content: "What's the refund policy?" },
        { role: "assistant", content: "Per our company policy document:\n\n• Full refunds available within 30 days of purchase\n• Items must be unused and in original packaging\n• Refunds processed within 5-7 business days\n• Original shipping costs are non-refundable\n\nFor exceptions, contact customer service.", cached: false },
        { role: "user", userName: "User 2", content: "Can I get my money back if I return something?" },
        { role: "assistant", content: "Per our company policy document:\n\n• Full refunds available within 30 days of purchase\n• Items must be unused and in original packaging\n• Refunds processed within 5-7 business days\n• Original shipping costs are non-refundable\n\nFor exceptions, contact customer service.", cached: true },
        { role: "user", userName: "User 3", content: "How do returns work here?" },
        { role: "assistant", content: "Per our company policy document:\n\n• Full refunds available within 30 days of purchase\n• Items must be unused and in original packaging\n• Refunds processed within 5-7 business days\n• Original shipping costs are non-refundable\n\nFor exceptions, contact customer service.", cached: true },
      ]}
      bottomLine="RAG applications benefit doubly — skip both the vector search and LLM generation. For knowledge bases with common queries, this dramatically reduces cost and latency."
      customerExamples={[
        "Notion AI Search",
        "Confluence Knowledge Base",
        "SharePoint Copilot",
        "Guru AI Assistant",
        "Internal Wikis",
        "HR Policy Bots"
      ]}
    />
  )
}
