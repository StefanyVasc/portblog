import { MarkdownRenderer } from '@/components/MarkdownRenderer'

export const PostContent = ({ content }: { content: string | null }) =>
  content ? (
    <div className="p-6 max-w-3xl mx-auto">
      <MarkdownRenderer content={content} />
    </div>
  ) : (
    <p className="text-center mt-10">Post não encontrado.</p>
  )
