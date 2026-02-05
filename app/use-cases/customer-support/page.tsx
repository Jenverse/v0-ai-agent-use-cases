import { Headphones } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function CustomerSupportPage() {
  return (
    <UseCasePageLayout
      title="Customer Support"
      icon={<Headphones className="w-7 h-7 text-emerald-500" />}
      isGoodFit={true}
      keyPoints={[
        {
          title: "Repetitive by Nature",
          description: "Support tickets follow patterns. Password resets, shipping inquiries, return policies — the same issues arrive daily, just worded differently by each customer."
        },
        {
          title: "Common Questions Dominate",
          description: "A small set of questions (top 20) typically account for the majority of support volume. These are prime candidates for caching."
        },
        {
          title: "Consistent Resolution Paths",
          description: "Most common issues have standard solutions. \"Reset password\" has the same steps whether the customer says \"forgot credentials\" or \"locked out of account\"."
        },
        {
          title: "24/7 Instant Response",
          description: "Cached responses mean customers get immediate answers at 3 AM without waiting for human agents. No LLM latency, no queue times."
        },
      ]}
      scenario="Help desk chatbot handling account access issues"
      conversation={[
        { role: "user", userName: "User 1", content: "How do I reset my password?" },
        { role: "assistant", content: "To reset your password:\n\n1. Go to Settings > Account > Security\n2. Click \"Reset Password\"\n3. Check your email for a reset link (arrives within 5 minutes)\n4. Click the link and create a new password\n\nNeed more help? Contact support@company.com", cached: false },
        { role: "user", userName: "User 2", content: "I forgot my login credentials" },
        { role: "assistant", content: "To reset your password:\n\n1. Go to Settings > Account > Security\n2. Click \"Reset Password\"\n3. Check your email for a reset link (arrives within 5 minutes)\n4. Click the link and create a new password\n\nNeed more help? Contact support@company.com", cached: true },
        { role: "user", userName: "User 3", content: "Can't get into my account, what do I do?" },
        { role: "assistant", content: "To reset your password:\n\n1. Go to Settings > Account > Security\n2. Click \"Reset Password\"\n3. Check your email for a reset link (arrives within 5 minutes)\n4. Click the link and create a new password\n\nNeed more help? Contact support@company.com", cached: true },
      ]}
      bottomLine="Password reset is the #1 support request across industries. Different customers, different words, same solution."
      customerExamples={[
        "Zendesk AI Agents",
        "Intercom Chatbots",
        "Freshdesk Support",
        "Salesforce Service Cloud",
        "HubSpot Help Desk",
        "Drift Conversational AI"
      ]}
    />
  )
}
