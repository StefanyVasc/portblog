import '@/shared/styles/markdown.css'
import 'highlight.js/styles/github-dark.css'

import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="markdown-content prose dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeHighlight,
            {
              ignoreMissing: true,
              languages: {
                javascript,
                js: javascript,
                typescript,
                ts: typescript,
                tsx: typescript,
                json,
                css,
                html,
                xml: html,
                bash,
                shell: bash
              }
            }
          ]
        ]}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
