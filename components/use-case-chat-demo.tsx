"use client"

import React from "react"

import { useState } from "react"
import { ShoppingBag, Headphones, Mic, Bot, Search, Code, MessageCircle, RefreshCw, Sparkles, Shield, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  cached?: boolean
  userName?: string
}

interface UseCase {
  id: string
  icon: React.ElementType
  title: string
  shortDesc: string
  product?: {
    name: string
    image: string
  }
  conversation: ChatMessage[]
  isGoodFit: boolean
  cacheExplanation: string
}

const goodUseCases: UseCase[] = [
  {
    id: "product-qa",
    icon: ShoppingBag,
    title: "Product Q&A",
    shortDesc: "E-commerce chatbots",
    product: {
      name: "ThermoFlask Pro",
      image: "/thermos.jpg"
    },
    conversation: [
      { role: "user", userName: "User 1", content: "How long does the thermos keep food warm?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: false },
      { role: "user", userName: "User 2", content: "Will my soup stay hot all day in this?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: true },
      { role: "user", userName: "User 3", content: "Is it good for keeping meals warm?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "3 different users asking the same thing in their own words — all served from one cached response"
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "Customer Support",
    shortDesc: "Help desk & support bots",
    conversation: [
      { role: "user", userName: "User 1", content: "How do I reset my password?" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link.", cached: false },
      { role: "user", userName: "User 2", content: "I forgot my login credentials" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link.", cached: true },
      { role: "user", userName: "User 3", content: "Can't get into my account, what do I do?" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Password reset is the #1 support question — each user phrases it differently, same answer works"
  },
  {
    id: "voice-search",
    icon: Mic,
    title: "Voice Search",
    shortDesc: "Voice assistants & search",
    conversation: [
      { role: "user", userName: "User 1", content: "Hey, find me Italian restaurants nearby" },
      { role: "assistant", content: "Here are the top Italian restaurants near you: 1. Bella Italia (0.3 mi), 2. Tony's Trattoria (0.5 mi), 3. Pasta House (0.8 mi)", cached: false },
      { role: "user", userName: "User 2", content: "Um, I'm looking for like, Italian food around here" },
      { role: "assistant", content: "Here are the top Italian restaurants near you: 1. Bella Italia (0.3 mi), 2. Tony's Trattoria (0.5 mi), 3. Pasta House (0.8 mi)", cached: true },
      { role: "user", userName: "User 3", content: "Show me some Italian places to eat" },
      { role: "assistant", content: "Here are the top Italian restaurants near you: 1. Bella Italia (0.3 mi), 2. Tony's Trattoria (0.5 mi), 3. Pasta House (0.8 mi)", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Voice has natural variations — 'um', 'like', casual phrasing — but the intent is identical"
  },
  {
    id: "ai-assistant",
    icon: Bot,
    title: "FAQ Chatbots",
    shortDesc: "Knowledge base assistants",
    conversation: [
      { role: "user", userName: "User 1", content: "What are your business hours?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays.", cached: false },
      { role: "user", userName: "User 2", content: "When are you guys open?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays.", cached: true },
      { role: "user", userName: "User 3", content: "What time do you close?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "FAQ questions are asked thousands of times daily by different users — perfect for caching"
  },
  {
    id: "rag",
    icon: Search,
    title: "RAG Applications",
    shortDesc: "Document search & retrieval",
    conversation: [
      { role: "user", userName: "User 1", content: "What's your refund policy?" },
      { role: "assistant", content: "According to our policy document: Full refunds are available within 30 days of purchase. Items must be unused and in original packaging.", cached: false },
      { role: "user", userName: "User 2", content: "Can I get my money back if I return something?" },
      { role: "assistant", content: "According to our policy document: Full refunds are available within 30 days of purchase. Items must be unused and in original packaging.", cached: true },
      { role: "user", userName: "User 3", content: "How do returns work here?" },
      { role: "assistant", content: "According to our policy document: Full refunds are available within 30 days of purchase. Items must be unused and in original packaging.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Document queries retrieve the same content — multiple users, one cached response"
  },
]

const badUseCases: UseCase[] = [
  {
    id: "code-gen",
    icon: Code,
    title: "Code Generation",
    shortDesc: "Programming assistance",
    conversation: [
      { role: "user", userName: "User 1", content: "Write a function to sort an array" },
      { role: "assistant", content: "function sortArray(arr) {\n  return arr.sort((a, b) => a - b);\n}", cached: false },
      { role: "user", userName: "User 2", content: "Write a function to sort an array of objects by name" },
      { role: "assistant", content: "WRONG if cached! User 2 needs objects sorted by 'name' property — completely different from sorting numbers.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Sounds similar but requires totally different code — tiny wording changes, big logic differences"
  },
  {
    id: "multi-turn",
    icon: MessageCircle,
    title: "Multi-Turn Chats",
    shortDesc: "Complex conversations",
    conversation: [
      { role: "user", userName: "User 1", content: "I want to plan a trip" },
      { role: "assistant", content: "Great! Where would you like to go?", cached: false },
      { role: "user", userName: "User 1", content: "Somewhere warm with beaches" },
      { role: "assistant", content: "How about Miami, Cancun, or the Bahamas?", cached: false },
      { role: "user", userName: "User 2", content: "I want to plan a trip" },
      { role: "assistant", content: "Can't cache this! User 2 might want mountains, not beaches. Each conversation needs fresh context.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Same opening question, but each user's follow-up changes everything — context-dependent"
  },
  {
    id: "realtime",
    icon: RefreshCw,
    title: "Real-Time Data",
    shortDesc: "Live information queries",
    conversation: [
      { role: "user", userName: "User 1 (9:00 AM)", content: "What's Apple's stock price?" },
      { role: "assistant", content: "AAPL is trading at $187.50", cached: false },
      { role: "user", userName: "User 2 (2:00 PM)", content: "What's Apple stock at?" },
      { role: "assistant", content: "WRONG if cached! Price changed to $191.25 since morning. Real-time data can't be cached.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Stock prices, sports scores, news — data changes constantly, cached answers become lies"
  },
  {
    id: "creative",
    icon: Sparkles,
    title: "Creative Writing",
    shortDesc: "Content generation",
    conversation: [
      { role: "user", userName: "User 1", content: "Write me a tagline for my coffee shop" },
      { role: "assistant", content: "\"Wake up to something wonderful.\"", cached: false },
      { role: "user", userName: "User 2", content: "Give me a slogan for my cafe" },
      { role: "assistant", content: "BAD if cached! User 2 gets the same tagline as User 1 — defeats the whole point of creativity.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Users expect unique creative output — recycling someone else's tagline is useless"
  },
  {
    id: "high-stakes",
    icon: Shield,
    title: "Medical/Legal/Finance",
    shortDesc: "High-stakes advice",
    conversation: [
      { role: "user", userName: "User 1", content: "I have chest pain and shortness of breath" },
      { role: "assistant", content: "Please seek immediate medical attention. Call emergency services.", cached: false },
      { role: "user", userName: "User 2", content: "My chest feels tight and I can't breathe well" },
      { role: "assistant", content: "DANGEROUS if cached! Could be anxiety, asthma, or heart attack — each case needs individual assessment.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Similar symptoms, different causes — medical/legal/financial advice must be evaluated fresh"
  },
]

export function UseCaseChatDemo() {
  const [selectedGoodCase, setSelectedGoodCase] = useState<UseCase>(goodUseCases[0])
  const [selectedBadCase, setSelectedBadCase] = useState<UseCase>(badUseCases[0])

  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Good Fit Section */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Great For Semantic Caching</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Click a use case to see how the same answer serves multiple question variations
          </p>

          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Use Case Selector */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {goodUseCases.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => setSelectedGoodCase(useCase)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all whitespace-nowrap lg:whitespace-normal",
                    "border border-border hover:border-emerald-500/50",
                    selectedGoodCase.id === useCase.id
                      ? "bg-emerald-500/10 border-emerald-500 text-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  <useCase.icon className={cn(
                    "w-5 h-5 shrink-0",
                    selectedGoodCase.id === useCase.id ? "text-emerald-500" : "text-muted-foreground"
                  )} />
                  <div>
                    <div className="font-medium text-sm">{useCase.title}</div>
                    <div className="text-xs text-muted-foreground hidden lg:block">{useCase.shortDesc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat Demo */}
            <ChatWindow useCase={selectedGoodCase} variant="good" />
          </div>
        </section>

        {/* Bad Fit Section */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Not Ideal For</h2>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            Click to see why these scenarios don't benefit from semantic caching
          </p>

          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            {/* Use Case Selector */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {badUseCases.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => setSelectedBadCase(useCase)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all whitespace-nowrap lg:whitespace-normal",
                    "border border-border hover:border-red-500/50",
                    selectedBadCase.id === useCase.id
                      ? "bg-red-500/10 border-red-500 text-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  )}
                >
                  <useCase.icon className={cn(
                    "w-5 h-5 shrink-0",
                    selectedBadCase.id === useCase.id ? "text-red-500" : "text-muted-foreground"
                  )} />
                  <div>
                    <div className="font-medium text-sm">{useCase.title}</div>
                    <div className="text-xs text-muted-foreground hidden lg:block">{useCase.shortDesc}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Chat Demo */}
            <ChatWindow useCase={selectedBadCase} variant="bad" />
          </div>
        </section>
      </div>
    </div>
  )
}

function ChatWindow({ useCase, variant }: { useCase: UseCase, variant: "good" | "bad" }) {
  const accentColor = variant === "good" ? "emerald" : "red"
  
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Chat Header */}
      <div className={cn(
        "px-4 py-3 border-b border-border flex items-center gap-3",
        variant === "good" ? "bg-emerald-500/5" : "bg-red-500/5"
      )}>
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          variant === "good" ? "bg-emerald-500/20" : "bg-red-500/20"
        )}>
          <useCase.icon className={cn(
            "w-4 h-4",
            variant === "good" ? "text-emerald-500" : "text-red-500"
          )} />
        </div>
        <div>
          <div className="font-medium text-foreground text-sm">{useCase.title}</div>
          <div className="text-xs text-muted-foreground">{useCase.shortDesc}</div>
        </div>
      </div>

      {/* Product Display (if applicable) */}
      {useCase.product && (
        <div className="px-4 py-3 border-b border-border bg-secondary/30 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
            🧴
          </div>
          <div>
            <div className="font-medium text-foreground text-sm">{useCase.product.name}</div>
            <div className="text-xs text-muted-foreground">Double-wall vacuum insulated container</div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="p-4 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
        {useCase.conversation.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col",
              message.role === "user" ? "items-end" : "items-start"
            )}
          >
            {message.role === "user" && message.userName && (
              <span className="text-xs text-muted-foreground mb-1 px-1">{message.userName}</span>
            )}
            <div className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2",
              message.role === "user"
                ? "bg-secondary text-foreground rounded-br-md"
                : "bg-muted/50 text-foreground rounded-bl-md"
            )}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.role === "assistant" && message.cached !== undefined && (
                <div className={cn(
                  "mt-2 text-xs font-medium flex items-center gap-1",
                  message.cached ? "text-emerald-500" : "text-muted-foreground"
                )}>
                  {message.cached ? (
                    <>
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Served from cache
                    </>
                  ) : (
                    <>
                      <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground" />
                      New LLM call
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Explanation Footer */}
      <div className={cn(
        "px-4 py-3 border-t border-border",
        variant === "good" ? "bg-emerald-500/5" : "bg-red-500/5"
      )}>
        <div className={cn(
          "text-sm font-medium",
          variant === "good" ? "text-emerald-500" : "text-red-500"
        )}>
          {variant === "good" ? "Why it works:" : "Why it doesn't work:"}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {useCase.cacheExplanation}
        </p>
      </div>
    </div>
  )
}
