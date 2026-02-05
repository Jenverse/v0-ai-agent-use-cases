"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShoppingBag, Headphones, Mic, Bot, Search, Code, RefreshCw, Sparkles, Shield, CheckCircle2, XCircle, ExternalLink, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "ideal" | "not-ideal"

interface UseCase {
  id: string
  icon: React.ElementType
  title: string
  description: string
  href: string
}

const idealUseCases: UseCase[] = [
  {
    id: "product-qa",
    icon: ShoppingBag,
    title: "Product Q&A",
    description: "Customers ask the same product questions in hundreds of different ways",
    href: "/use-cases/product-qa"
  },
  {
    id: "customer-support",
    icon: Headphones,
    title: "Customer Support",
    description: "Support tickets are repetitive — same issues, just worded differently",
    href: "/use-cases/customer-support"
  },
  {
    id: "voice-search",
    icon: Mic,
    title: "Voice Search",
    description: "Voice input is naturally messy with filler words and casual phrasing",
    href: "/use-cases/voice-search"
  },
  {
    id: "faq-chatbot",
    icon: Bot,
    title: "FAQ Chatbots",
    description: "FAQs exist because the same questions get asked constantly",
    href: "/use-cases/faq-chatbots"
  },
  {
    id: "rag",
    icon: Search,
    title: "RAG Applications",
    description: "Knowledge base queries often retrieve the same documents",
    href: "/use-cases/rag-applications"
  },
]

const notIdealUseCases: UseCase[] = [
  {
    id: "code-gen",
    icon: Code,
    title: "Code Generation",
    description: "Tiny wording differences lead to completely different implementations",
    href: "/use-cases/code-generation"
  },
  {
    id: "realtime",
    icon: RefreshCw,
    title: "Real-Time Data",
    description: "Stock prices, weather, scores — data changes constantly",
    href: "/use-cases/real-time-data"
  },
  {
    id: "creative",
    icon: Sparkles,
    title: "Creative Writing",
    description: "Users expect unique outputs, not recycled content",
    href: "/use-cases/creative-writing"
  },
  {
    id: "high-stakes",
    icon: Shield,
    title: "Medical Triaging",
    description: "Symptom assessment requires individual evaluation, not cached responses",
    href: "/use-cases/high-stakes"
  },
]

export function UseCaseChatDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("ideal")

  const useCases = activeTab === "ideal" ? idealUseCases : notIdealUseCases
  const isIdeal = activeTab === "ideal"

  return (
    <div className="py-12 px-6">
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

        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isIdeal ? "Perfect for Semantic Caching" : "Not Ideal for Semantic Caching"}
          </h2>
          <p className="text-muted-foreground">
            {isIdeal 
              ? "Click any use case to see a detailed example with chat demo" 
              : "Understanding when semantic caching is not the right fit"
            }
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase) => (
            <Link 
              key={useCase.id} 
              href={useCase.href}
              className={cn(
                "group block p-6 rounded-2xl border transition-all hover:scale-[1.02]",
                isIdeal 
                  ? "bg-card border-border hover:border-emerald-500/50 hover:bg-emerald-500/5" 
                  : "bg-card border-border hover:border-red-500/50 hover:bg-red-500/5"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  isIdeal ? "bg-emerald-500/20" : "bg-red-500/20"
                )}>
                  <useCase.icon className={cn(
                    "w-6 h-6",
                    isIdeal ? "text-emerald-500" : "text-red-500"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                    {useCase.title}
                    <ArrowRight className={cn(
                      "w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0",
                      isIdeal ? "text-emerald-500" : "text-red-500"
                    )} />
                  </h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA for Ideal */}
        {isIdeal && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">
                Each click shows Why It Works + Live Chat Demo
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
