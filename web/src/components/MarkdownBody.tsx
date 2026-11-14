import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function MarkdownBody({ source }: { source: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>
    </div>
  )
}
