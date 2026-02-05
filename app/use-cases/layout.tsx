import React from "react"
import Link from "next/link"
import { Database, ArrowLeft } from "lucide-react"

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to all use cases</span>
          </Link>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Redis LangCache</span>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
