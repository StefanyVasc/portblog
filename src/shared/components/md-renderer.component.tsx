import '@/shared/styles/markdown.css'
import 'highlight.js/styles/github-dark.css'

import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

const supportedLanguages = {
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

Object.entries(supportedLanguages).forEach(([name, language]) => {
  hljs.registerLanguage(name, language)
})

const markdownComponents: Components = {
  code({ className, children, ...props }) {
    const match = /language-([\w-]+)/.exec(className || '')
    const language = match?.[1]
    const code = String(children).replace(/\n$/, '')

    if (!language || !hljs.getLanguage(language)) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }

    const highlighted = hljs.highlight(code, {
      language,
      ignoreIllegals: true
    }).value

    return (
      <pre className="hljs">
        <code
          className={`hljs language-${language}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: output comes from highlight.js, not raw user input
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    )
  }
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="markdown-content prose">
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
