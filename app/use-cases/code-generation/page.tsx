import { Code } from "lucide-react"
import { UseCasePageLayout } from "@/components/use-case-page-layout"

export default function CodeGenerationPage() {
  return (
    <UseCasePageLayout
      title="Code Generation"
      icon={<Code className="w-7 h-7 text-red-500" />}
      isGoodFit={false}
      keyPoints={[
        {
          title: "Tiny Differences, Big Changes",
          description: "\"Sort an array\" vs \"Sort an array of objects by name\" sound similar but require completely different implementations. Semantic similarity doesn't mean functional equivalence."
        },
        {
          title: "Context is Everything",
          description: "Code requests depend heavily on the specific language, framework, coding style, and project context. A cached generic answer often won't fit the user's actual needs."
        },
        {
          title: "Precision Required",
          description: "Code must be exact. A cached response that's 90% similar semantically could be 100% wrong functionally. There's no 'close enough' in code."
        },
        {
          title: "High Variance in Requirements",
          description: "Even when questions sound similar, the specific requirements (error handling, edge cases, performance) often differ significantly between users."
        },
      ]}
      scenario="Developer asking for sorting functions"
      conversation={[
        { role: "user", userName: "User 1", content: "Write a function to sort an array" },
        { role: "assistant", content: "function sortArray(arr) {\n  return arr.sort((a, b) => a - b);\n}", cached: false },
        { role: "user", userName: "User 2", content: "Write a function to sort an array of objects by name" },
        { role: "assistant", content: "WRONG if cached!\n\nUser 2 needs a completely different implementation:\n\nfunction sortByName(arr) {\n  return arr.sort((a, b) => \n    a.name.localeCompare(b.name)\n  );\n}\n\nThe cached numeric sort would fail on objects.", cached: false },
      ]}
      bottomLine="Code requests that sound semantically similar often require fundamentally different implementations. The semantic similarity that makes caching work in other domains becomes a liability for code generation."
    />
  )
}
