import { RefreshCw } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function RealTimeDataPage() {
  return (
    <UseCasePageLayout
      title="Real-Time Data"
      icon={<RefreshCw className="w-7 h-7 text-red-500" />}
      isGoodFit={false}
      keyPoints={[
        {
          title: "Data Changes Constantly",
          description: "Stock prices, weather, sports scores, inventory levels — this information updates continuously. A cached answer from 10 minutes ago is already wrong."
        },
        {
          title: "Stale Data = Wrong Data",
          description: "Unlike opinion-based answers, factual real-time data has a clear right/wrong. Serving yesterday's stock price isn't 'close enough' — it's incorrect."
        },
        {
          title: "Time-Sensitivity is Critical",
          description: "Users asking for real-time data need current information. The whole point of their query is to get the latest state, not a cached historical snapshot."
        },
        {
          title: "Trust Erosion",
          description: "Returning stale real-time data erodes user trust quickly. One wrong stock price or outdated weather report damages credibility."
        },
      ]}
      scenario="Financial assistant checking stock prices"
      conversation={[
        { role: "user", userName: "User 1 (9:00 AM)", content: "What's Apple's stock price?" },
        { role: "assistant", content: "AAPL is currently trading at $187.50 per share.", cached: false },
        { role: "user", userName: "User 2 (2:00 PM)", content: "What's Apple stock at?" },
        { role: "assistant", content: "WRONG if cached!\n\nThe market has moved. AAPL is now at $191.25.\n\nReturning the cached $187.50 price from the morning would give User 2 a price that's $3.75 off — potentially impacting trading decisions.", cached: false },
      ]}
      bottomLine="Real-time data queries are fundamentally incompatible with caching. The entire value proposition is freshness."
      customerExamples={[
        "Bloomberg Terminal AI",
        "Trading Platforms",
        "Live Sports Apps",
        "Flight Status Trackers",
        "Weather Apps",
        "Inventory Systems"
      ]}
    />
  )
}
