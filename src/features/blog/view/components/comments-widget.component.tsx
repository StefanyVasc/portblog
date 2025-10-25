import { useEffect, useRef } from 'react'

import { env } from '@/env'
import { texts } from '@/shared/content/texts'

const REPO = env.VITE_UTTERANCES_REPO
const ISSUE_LABEL = env.VITE_UTTERANCES_LABEL
const THEME = env.VITE_UTTERANCES_THEME
const UTTERANCES_ORIGIN = 'https://utteranc.es'

type CommentsWidgetProps = {
  title: string
}

export function CommentsWidget({ title }: CommentsWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const messageTexts = texts.blog.comments

  useEffect(() => {
    const container = containerRef.current

    if (!REPO || !container) return

    const existingIframe = container.querySelector<HTMLIFrameElement>(
      'iframe.utterances-frame'
    )

    const message = {
      type: 'load',
      repo: REPO,
      issueTerm: title,
      label: ISSUE_LABEL,
      theme: THEME
    }

    if (existingIframe?.contentWindow) {
      existingIframe.contentWindow.postMessage(message, UTTERANCES_ORIGIN)
      return
    }

    let cancelled = false
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', REPO)
    script.setAttribute('issue-term', title)
    script.setAttribute('label', ISSUE_LABEL)
    script.setAttribute('theme', THEME)

    const rafId = requestAnimationFrame(() => {
      if (cancelled || !container.isConnected) return
      container.replaceChildren(script)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      if (container.contains(script)) {
        script.remove()
      }
    }
  }, [title])

  if (!REPO) {
    return (
      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
        {messageTexts.setupMissing}
      </p>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-8 max-w-2xl border-t border-gray-300 pt-6"
    />
  )
}
