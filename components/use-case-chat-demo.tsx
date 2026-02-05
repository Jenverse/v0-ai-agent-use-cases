"use client"

import React from "react"

import { useState } from "react"
import { ShoppingBag, Headphones, Mic, Bot, Search, Code, MessageCircle, RefreshCw, Sparkles, Shield, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  cached?: boolean
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
      { role: "user", content: "How long does the thermos keep food warm?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: false },
      { role: "user", content: "Will my soup stay hot all day in this?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: true },
      { role: "user", content: "Is it good for keeping meals warm?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Same answer works for all 3 questions because they ask the same thing in different ways"
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "Customer Support",
    shortDesc: "Help desk & support bots",
    conversation: [
      { role: "user", content: "How do I reset my password?" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link.", cached: false },
      { role: "user", content: "I forgot my login credentials" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link.", cached: true },
      { role: "user", content: "Can't get into my account, what do I do?" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Support questions are often asked many different ways but have the same solution"
  },
  {
    id: "voice-search",
    icon: Mic,
    title: "Voice Search",
    shortDesc: "Voice assistants & search",
    conversation: [
      { role: "user", content: "What's the weather gonna be like today?" },
      { role: "assistant", content: "I can help you check the weather! Please note: For live weather data, I'd connect to a weather API. Semantic caching helps when users ask about weather features or historical patterns.", cached: false },
      { role: "user", content: "Um, how's the weather looking?" },
      { role: "assistant", content: "I can help you check the weather! Please note: For live weather data, I'd connect to a weather API. Semantic caching helps when users ask about weather features or historical patterns.", cached: true },
      { role: "user", content: "Tell me about today's weather" },
      { role: "assistant", content: "I can help you check the weather! Please note: For live weather data, I'd connect to a weather API. Semantic caching helps when users ask about weather features or historical patterns.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Voice queries have natural speech variations — 'gonna', 'um', different phrasings — but mean the same thing"
  },
  {
    id: "ai-assistant",
    icon: Bot,
    title: "FAQ Chatbots",
    shortDesc: "Knowledge base assistants",
    conversation: [
      { role: "user", content: "What are your business hours?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays.", cached: false },
      { role: "user", content: "When are you guys open?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays.", cached: true },
      { role: "user", content: "What time do you close?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "FAQ questions are asked thousands of times daily — perfect for caching"
  },
  {
    id: "rag",
    icon: Search,
    title: "RAG Applications",
    shortDesc: "Document search & retrieval",
    conversation: [
      { role: "user", content: "What's our refund policy?" },
      { role: "assistant", content: "According to our policy document: Full refunds are available within 30 days of purchase. Items must be unused and in original packaging.", cached: false },
      { role: "user", content: "Can I get my money back if I return something?" },
      { role: "assistant", content: "According to our policy document: Full refunds are available within 30 days of purchase. Items must be unused and in original packaging.", cached: true },
      { role: "user", content: "How do returns work here?" },
      { role: "assistant", content: "According to our policy document: Full refunds are available within 30 days of purchase. Items must be unused and in original packaging.", cached: true },
    ],
    isGoodFit: true,
    cacheExplanation: "Document queries often retrieve the same content — cache the response, skip the retrieval"
  },
]

const badUseCases: UseCase[] = [
  {
    id: "code-gen",
    icon: Code,
    title: "Code Generation",
    shortDesc: "Programming assistance",
    conversation: [
      { role: "user", content: "Write a function to sort an array" },
      { role: "assistant", content: "function sortArray(arr) {\n  return arr.sort((a, b) => a - b);\n}", cached: false },
      { role: "user", content: "Write a function to sort an array of objects by name" },
      { role: "assistant", content: "This is a DIFFERENT question! Needs objects sorted by 'name' property, not numbers. A cached response would be wrong.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Tiny differences in code requirements lead to completely different correct answers"
  },
  {
    id: "multi-turn",
    icon: MessageCircle,
    title: "Multi-Turn Chats",
    shortDesc: "Complex conversations",
    conversation: [
      { role: "user", content: "I want to plan a trip" },
      { role: "assistant", content: "Great! Where would you like to go?", cached: false },
      { role: "user", content: "Somewhere warm" },
      { role: "assistant", content: "How about Miami or Cancun? When are you thinking of traveling?", cached: false },
      { role: "user", content: "I want to plan a trip" },
      { role: "assistant", content: "Each 'plan a trip' conversation is unique based on follow-up context. Caching the first response would ignore the conversation history.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Every response depends on the full conversation history — context makes caching ineffective"
  },
  {
    id: "realtime",
    icon: RefreshCw,
    title: "Real-Time Data",
    shortDesc: "Live information queries",
    conversation: [
      { role: "user", content: "What's Apple's stock price right now?" },
      { role: "assistant", content: "AAPL is trading at $187.50 (as of 10:30 AM)", cached: false },
      { role: "user", content: "What's Apple stock at?" },
      { role: "assistant", content: "DANGER: A cached response would show old/wrong price! Real-time data must always be fresh.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Stock prices, weather, and live data change constantly — stale cache = wrong answers"
  },
  {
    id: "creative",
    icon: Sparkles,
    title: "Creative Writing",
    shortDesc: "Content generation",
    conversation: [
      { role: "user", content: "Write me a tagline for my coffee shop" },
      { role: "assistant", content: "\"Wake up to something wonderful.\"", cached: false },
      { role: "user", content: "Give me a slogan for my cafe" },
      { role: "assistant", content: "Users expect UNIQUE creative outputs each time. Returning the same tagline defeats the purpose!", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Creative requests expect fresh, unique outputs — not recycled content"
  },
  {
    id: "high-stakes",
    icon: Shield,
    title: "Medical/Legal/Finance",
    shortDesc: "High-stakes advice",
    conversation: [
      { role: "user", content: "I have chest pain and shortness of breath" },
      { role: "assistant", content: "Please seek immediate medical attention. Call emergency services or go to the nearest ER.", cached: false },
      { role: "user", content: "My chest feels tight and I can't breathe well" },
      { role: "assistant", content: "Similar symptoms can have very different causes. Medical advice requires careful evaluation, not cached responses.", cached: false },
    ],
    isGoodFit: false,
    cacheExplanation: "Medical, legal, and financial advice needs precise evaluation — caching risks dangerous errors"
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
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
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
                      Served from cache — instant response
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
