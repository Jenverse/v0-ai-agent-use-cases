"use client"

import React from "react"

import { cn } from "@/lib/utils"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  cached?: boolean
  userName?: string
}

interface UseCasePageLayoutProps {
  title: string
  icon: React.ReactNode
  keyPoints: {
    title: string
    description: string
  }[]
  scenario: string
  conversation: ChatMessage[]
  bottomLine: string
  customerExamples: string[]
  isGoodFit: boolean
}

export function UseCasePageLayout({
  title,
  icon,
  keyPoints,
  scenario,
  conversation,
  bottomLine,
  customerExamples,
  isGoodFit,
}: UseCasePageLayoutProps) {
  const accentColor = isGoodFit ? "emerald" : "red"
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Title */}
      <div className="flex items-center gap-4 mb-10">
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center",
          isGoodFit ? "bg-emerald-500/20" : "bg-red-500/20"
        )}>
          {icon}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <span className={cn(
            "text-sm font-medium",
            isGoodFit ? "text-emerald-500" : "text-red-500"
          )}>
            {isGoodFit ? "Ideal for Semantic Caching" : "Not Ideal for Semantic Caching"}
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Why it's a good/bad fit */}
        <div className="space-y-6">
          <div>
            <h2 className={cn(
              "text-xl font-semibold mb-6",
              isGoodFit ? "text-emerald-500" : "text-red-500"
            )}>
              {isGoodFit ? "Why it's a Good Fit" : "Why it's Not Ideal"}
            </h2>
            
            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-semibold text-sm",
                    isGoodFit 
                      ? "bg-emerald-500/20 text-emerald-500" 
                      : "bg-red-500/20 text-red-500"
                  )}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{point.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Line */}
          <div className={cn(
            "rounded-xl p-5 border",
            isGoodFit 
              ? "bg-emerald-500/10 border-emerald-500/30" 
              : "bg-red-500/10 border-red-500/30"
          )}>
            <h3 className={cn(
              "font-semibold mb-2",
              isGoodFit ? "text-emerald-500" : "text-red-500"
            )}>
              Bottom Line
            </h3>
            <p className="text-foreground mb-4">{bottomLine}</p>
            
            {/* Customer Examples */}
            <div className="pt-4 border-t border-border/50">
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                {isGoodFit ? "Target Customers" : "Examples to Avoid"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {customerExamples.map((example, index) => (
                  <span 
                    key={index}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium",
                      isGoodFit 
                        ? "bg-emerald-500/20 text-emerald-400" 
                        : "bg-red-500/20 text-red-400"
                    )}
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Chat Demo */}
        <div className="border border-border rounded-2xl overflow-hidden bg-card">
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-border bg-secondary/30">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Example Scenario</span>
            <p className="text-foreground font-medium mt-1">{scenario}</p>
          </div>

          {/* Chat Messages */}
          <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col",
                  message.role === "user" ? "items-end" : "items-start"
                )}
              >
                {message.role === "user" && message.userName && (
                  <span className={cn(
                    "text-xs font-semibold mb-1 px-1",
                    isGoodFit ? "text-emerald-500" : "text-red-500"
                  )}>
                    {message.userName}
                  </span>
                )}
                <div className={cn(
                  "max-w-[90%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-secondary text-foreground rounded-br-sm"
                    : "bg-muted/50 text-foreground rounded-bl-sm"
                )}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.role === "assistant" && message.cached !== undefined && (
                    <div className={cn(
                      "mt-2 text-xs font-semibold flex items-center gap-2 pt-2 border-t border-border/50",
                      message.cached ? "text-emerald-500" : "text-muted-foreground"
                    )}>
                      {message.cached ? (
                        <>
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          CACHE HIT
                        </>
                      ) : (
                        <>
                          <span className="inline-block w-2 h-2 rounded-full bg-muted-foreground" />
                          New LLM Call
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
