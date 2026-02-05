import { ShoppingBag } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function ProductQAPage() {
  return (
    <UseCasePageLayout
      title="Product Q&A"
      icon={<ShoppingBag className="w-7 h-7 text-emerald-500" />}
      isGoodFit={true}
      keyPoints={[
        {
          title: "High Question Repetition",
          description: "Every product page receives the same questions asked hundreds of different ways. \"How long does it stay warm?\" and \"Will my lunch still be hot?\" are the same question with different words."
        },
        {
          title: "Stable Answers",
          description: "Product specs don't change frequently. A thermos that keeps food warm for 12 hours today will still do so tomorrow. Cached answers stay accurate."
        },
        {
          title: "Scalable Customer Experience",
          description: "During peak shopping seasons, thousands of customers ask similar questions simultaneously. Caching delivers instant responses without scaling LLM costs linearly."
        },
        {
          title: "Natural Language Variations",
          description: "Customers use casual language, typos, and regional phrases. Semantic caching understands that \"is it dishwasher safe\" and \"can I put this in the dishwasher\" are identical."
        },
      ]}
      scenario="Amazon-style product chatbot for a ThermoFlask Pro thermos"
      conversation={[
        { role: "user", userName: "User 1", content: "How long will the thermos keep my food warm?" },
        { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation. It's perfect for keeping your meals at the ideal temperature throughout your day.", cached: false },
        { role: "user", userName: "User 2", content: "Will my soup still be hot by lunchtime?" },
        { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation. It's perfect for keeping your meals at the ideal temperature throughout your day.", cached: true },
        { role: "user", userName: "User 3", content: "Is this good for keeping meals warm all day?" },
        { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation. It's perfect for keeping your meals at the ideal temperature throughout your day.", cached: true },
      ]}
      bottomLine="3 different customers, 3 different phrasings, 1 LLM call. Every cache hit means instant response + zero API cost."
      customerExamples={[
        "Amazon Product Pages",
        "Walmart.com Chatbot",
        "Best Buy Product Q&A",
        "Home Depot Assistant",
        "Shopify Stores",
        "Target.com Help"
      ]}
    />
  )
}
