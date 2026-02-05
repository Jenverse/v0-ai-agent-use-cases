"use client"

import React from "react"
import { useState } from "react"
import { ShoppingBag, Headphones, Mic, Bot, Search, Code, RefreshCw, Sparkles, Shield, CheckCircle2, XCircle, ChevronDown, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "ideal" | "not-ideal" | "discovery"

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
  whyGoodFit: string
  scenario: string
  conversation: ChatMessage[]
  bottomLine: string
}

interface BadUseCase {
  id: string
  icon: React.ElementType
  title: string
  whyBadFit: string
  scenario: string
  conversation: ChatMessage[]
  bottomLine: string
}

const idealUseCases: UseCase[] = [
  {
    id: "product-qa",
    icon: ShoppingBag,
    title: "Product Q&A",
    whyGoodFit: "Customers ask the same product questions in hundreds of different ways. \"How long does it stay warm?\" and \"Will my food still be hot at lunch?\" are semantically identical — one cached answer serves them all.",
    scenario: "Amazon-style product chatbot for a thermos",
    conversation: [
      { role: "user", userName: "User 1", content: "How long will the thermos keep my food warm?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: false },
      { role: "user", userName: "User 2", content: "Will my soup still be hot by lunchtime?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: true },
      { role: "user", userName: "User 3", content: "Is this good for keeping meals warm all day?" },
      { role: "assistant", content: "The ThermoFlask Pro keeps food hot for up to 12 hours and cold for up to 24 hours thanks to its double-wall vacuum insulation.", cached: true },
    ],
    bottomLine: "3 users, 3 different phrasings, 1 LLM call. Cache hits = instant responses + cost savings."
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "Customer Support",
    whyGoodFit: "Support tickets are repetitive by nature. Password resets, shipping questions, return policies — the same issues come in daily, just worded differently by each customer.",
    scenario: "Help desk chatbot handling account issues",
    conversation: [
      { role: "user", userName: "User 1", content: "How do I reset my password?" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link within 5 minutes.", cached: false },
      { role: "user", userName: "User 2", content: "I forgot my login credentials" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link within 5 minutes.", cached: true },
      { role: "user", userName: "User 3", content: "Can't get into my account, what do I do?" },
      { role: "assistant", content: "To reset your password: Go to Settings > Account > Security > Reset Password. You'll receive an email with a reset link within 5 minutes.", cached: true },
    ],
    bottomLine: "Password reset is the #1 support question. Different words, same solution — perfect for caching."
  },
  {
    id: "voice-search",
    icon: Mic,
    title: "Voice Search",
    whyGoodFit: "Voice input is naturally messy — filler words, casual phrasing, incomplete sentences. Semantic caching understands intent despite these variations.",
    scenario: "Voice assistant finding restaurants",
    conversation: [
      { role: "user", userName: "User 1", content: "Find me Italian restaurants nearby" },
      { role: "assistant", content: "Here are top Italian restaurants near you:\n1. Bella Italia (0.3 mi) - 4.5 stars\n2. Tony's Trattoria (0.5 mi) - 4.3 stars\n3. Pasta House (0.8 mi) - 4.4 stars", cached: false },
      { role: "user", userName: "User 2", content: "Um, I'm looking for like, Italian food around here?" },
      { role: "assistant", content: "Here are top Italian restaurants near you:\n1. Bella Italia (0.3 mi) - 4.5 stars\n2. Tony's Trattoria (0.5 mi) - 4.3 stars\n3. Pasta House (0.8 mi) - 4.4 stars", cached: true },
      { role: "user", userName: "User 3", content: "Show me some Italian places to eat" },
      { role: "assistant", content: "Here are top Italian restaurants near you:\n1. Bella Italia (0.3 mi) - 4.5 stars\n2. Tony's Trattoria (0.5 mi) - 4.3 stars\n3. Pasta House (0.8 mi) - 4.4 stars", cached: true },
    ],
    bottomLine: "Voice queries have natural speech variations — 'um', 'like', casual phrasing — but intent is identical."
  },
  {
    id: "faq-chatbot",
    icon: Bot,
    title: "FAQ Chatbots",
    whyGoodFit: "FAQs exist because the same questions come up constantly. \"When are you open?\" gets asked thousands of times daily in every possible variation.",
    scenario: "Business website chatbot answering common questions",
    conversation: [
      { role: "user", userName: "User 1", content: "What are your business hours?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays. Our support team typically responds within 2 hours during business hours.", cached: false },
      { role: "user", userName: "User 2", content: "When are you guys open?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays. Our support team typically responds within 2 hours during business hours.", cached: true },
      { role: "user", userName: "User 3", content: "What time do you close?" },
      { role: "assistant", content: "We're open Monday through Friday, 9 AM to 6 PM EST. Closed on weekends and major holidays. Our support team typically responds within 2 hours during business hours.", cached: true },
    ],
    bottomLine: "FAQ = Frequently Asked Questions. The 'frequently' part is why caching works so well."
  },
  {
    id: "rag",
    icon: Search,
    title: "RAG Applications",
    whyGoodFit: "When users query a knowledge base, many questions retrieve the same documents. Cache the response and skip both the retrieval AND the LLM call.",
    scenario: "Internal knowledge base for company policies",
    conversation: [
      { role: "user", userName: "User 1", content: "What's the refund policy?" },
      { role: "assistant", content: "Per our policy document: Full refunds available within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.", cached: false },
      { role: "user", userName: "User 2", content: "Can I get my money back if I return something?" },
      { role: "assistant", content: "Per our policy document: Full refunds available within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.", cached: true },
      { role: "user", userName: "User 3", content: "How do returns work here?" },
      { role: "assistant", content: "Per our policy document: Full refunds available within 30 days of purchase. Items must be unused and in original packaging. Refunds are processed within 5-7 business days.", cached: true },
    ],
    bottomLine: "Same documents, same answers — cache once, serve many."
  },
]

const notIdealUseCases: BadUseCase[] = [
  {
    id: "code-gen",
    icon: Code,
    title: "Code Generation",
    whyBadFit: "Small wording differences in code requests lead to completely different correct answers. Caching would return wrong code.",
    scenario: "Developer asking for sorting functions",
    conversation: [
      { role: "user", userName: "User 1", content: "Write a function to sort an array" },
      { role: "assistant", content: "function sortArray(arr) {\n  return arr.sort((a, b) => a - b);\n}", cached: false },
      { role: "user", userName: "User 2", content: "Write a function to sort an array of objects by name" },
      { role: "assistant", content: "WRONG if cached! User 2 needs to sort objects by a 'name' property — completely different logic than sorting numbers.", cached: false },
    ],
    bottomLine: "Sounds similar, but requires totally different code. Tiny wording changes = big logic differences."
  },
  {
    id: "realtime",
    icon: RefreshCw,
    title: "Real-Time Data",
    whyBadFit: "Stock prices, weather, sports scores — this data changes constantly. A cached answer from an hour ago is a wrong answer now.",
    scenario: "Financial assistant checking stock prices",
    conversation: [
      { role: "user", userName: "User 1 (9:00 AM)", content: "What's Apple's stock price?" },
      { role: "assistant", content: "AAPL is currently trading at $187.50", cached: false },
      { role: "user", userName: "User 2 (2:00 PM)", content: "What's Apple stock at?" },
      { role: "assistant", content: "WRONG if cached! Price is now $191.25 — the cached response would give outdated, incorrect information.", cached: false },
    ],
    bottomLine: "Real-time data can't be cached. Stale answers = wrong answers."
  },
  {
    id: "creative",
    icon: Sparkles,
    title: "Creative Writing",
    whyBadFit: "Users asking for creative content expect unique outputs. Returning the same tagline to everyone defeats the purpose.",
    scenario: "Marketing assistant generating taglines",
    conversation: [
      { role: "user", userName: "User 1", content: "Write me a tagline for my coffee shop" },
      { role: "assistant", content: "\"Wake up to something wonderful.\"", cached: false },
      { role: "user", userName: "User 2", content: "Give me a slogan for my cafe" },
      { role: "assistant", content: "USELESS if cached! User 2 gets the exact same tagline as User 1 — defeats the entire purpose of creative generation.", cached: false },
    ],
    bottomLine: "Creativity requires uniqueness. Recycled content is worthless."
  },
  {
    id: "high-stakes",
    icon: Shield,
    title: "Medical / Legal / Financial",
    whyBadFit: "High-stakes advice requires careful, individual evaluation. Similar-sounding symptoms or situations can have very different correct responses.",
    scenario: "Health chatbot receiving symptom reports",
    conversation: [
      { role: "user", userName: "User 1", content: "I have chest pain and shortness of breath" },
      { role: "assistant", content: "These symptoms require immediate medical attention. Please call emergency services or visit the nearest ER.", cached: false },
      { role: "user", userName: "User 2", content: "My chest feels tight and I can't breathe well" },
      { role: "assistant", content: "DANGEROUS if cached! Could be anxiety, asthma, or cardiac event — each requires different responses. Must evaluate individually.", cached: false },
    ],
    bottomLine: "When lives or livelihoods are at stake, every query deserves fresh evaluation."
  },
]

export function UseCaseChatDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("ideal")
  const [expandedCase, setExpandedCase] = useState<string | null>("product-qa")

  const toggleCase = (id: string) => {
    setExpandedCase(expandedCase === id ? null : id)
  }

  return (
    <div className="py-8 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveTab("ideal")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
              activeTab === "ideal"
                ? "bg-emerald-500 text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            <CheckCircle2 className="w-4 h-4" />
            Ideal Use Cases
          </button>
          <button
            onClick={() => setActiveTab("not-ideal")}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
              activeTab === "not-ideal"
                ? "bg-red-500 text-white"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            <XCircle className="w-4 h-4" />
            Not Ideal For
          </button>
          <a
            href="https://docs.google.com/document/d/1GPV5xwexYmCh9aHzof4pi2wJ9wjENRqsD6Q5wBItuVQ/edit?tab=t.0#heading=h.mhwoycf3d4gl"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            Discovery Guide
          </a>
        </div>

        {/* Ideal Use Cases */}
        {activeTab === "ideal" && (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Perfect for Semantic Caching</h2>
              <p className="text-muted-foreground">Click each use case to see a real-world example</p>
            </div>
            
            {idealUseCases.map((useCase) => (
              <div key={useCase.id} className="border border-border rounded-xl overflow-hidden bg-card">
                {/* Header - Always visible */}
                <button
                  onClick={() => toggleCase(useCase.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <useCase.icon className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.whyGoodFit.slice(0, 80)}...</p>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform",
                    expandedCase === useCase.id && "rotate-180"
                  )} />
                </button>

                {/* Expanded Content */}
                {expandedCase === useCase.id && (
                  <div className="border-t border-border">
                    {/* Why it's a good fit */}
                    <div className="px-6 py-4 bg-emerald-500/5">
                      <h4 className="font-medium text-emerald-500 mb-2">Why it's a good fit</h4>
                      <p className="text-foreground">{useCase.whyGoodFit}</p>
                    </div>

                    {/* Scenario */}
                    <div className="px-6 py-3 bg-secondary/30 border-y border-border">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Example Scenario</span>
                      <p className="text-sm text-foreground mt-1">{useCase.scenario}</p>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-3">
                      {useCase.conversation.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex flex-col",
                            message.role === "user" ? "items-end" : "items-start"
                          )}
                        >
                          {message.role === "user" && message.userName && (
                            <span className="text-xs text-emerald-500 font-medium mb-1 px-1">{message.userName}</span>
                          )}
                          <div className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-2",
                            message.role === "user"
                              ? "bg-secondary text-foreground rounded-br-sm"
                              : "bg-muted/50 text-foreground rounded-bl-sm"
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
                                    CACHE HIT — Instant response
                                  </>
                                ) : (
                                  <>
                                    <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground" />
                                    New LLM call (cached for next time)
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Line */}
                    <div className="px-6 py-4 bg-emerald-500/10 border-t border-border">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-foreground">{useCase.bottomLine}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Not Ideal Use Cases */}
        {activeTab === "not-ideal" && (
          <div className="space-y-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Not Ideal For These Scenarios</h2>
              <p className="text-muted-foreground">Understanding when semantic caching won't help</p>
            </div>
            
            {notIdealUseCases.map((useCase) => (
              <div key={useCase.id} className="border border-border rounded-xl overflow-hidden bg-card">
                {/* Header - Always visible */}
                <button
                  onClick={() => toggleCase(useCase.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <useCase.icon className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.whyBadFit.slice(0, 80)}...</p>
                    </div>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform",
                    expandedCase === useCase.id && "rotate-180"
                  )} />
                </button>

                {/* Expanded Content */}
                {expandedCase === useCase.id && (
                  <div className="border-t border-border">
                    {/* Why it's not ideal */}
                    <div className="px-6 py-4 bg-red-500/5">
                      <h4 className="font-medium text-red-500 mb-2">Why it's not ideal</h4>
                      <p className="text-foreground">{useCase.whyBadFit}</p>
                    </div>

                    {/* Scenario */}
                    <div className="px-6 py-3 bg-secondary/30 border-y border-border">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Example Scenario</span>
                      <p className="text-sm text-foreground mt-1">{useCase.scenario}</p>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-3">
                      {useCase.conversation.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex flex-col",
                            message.role === "user" ? "items-end" : "items-start"
                          )}
                        >
                          {message.role === "user" && message.userName && (
                            <span className="text-xs text-red-400 font-medium mb-1 px-1">{message.userName}</span>
                          )}
                          <div className={cn(
                            "max-w-[85%] rounded-2xl px-4 py-2",
                            message.role === "user"
                              ? "bg-secondary text-foreground rounded-br-sm"
                              : "bg-muted/50 text-foreground rounded-bl-sm"
                          )}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Line */}
                    <div className="px-6 py-4 bg-red-500/10 border-t border-border">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-foreground">{useCase.bottomLine}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
