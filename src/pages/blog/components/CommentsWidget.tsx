import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const REPO = import.meta.env.VITE_UTTERANCES_REPO
const ISSUE_LABEL = import.meta.env.VITE_UTTERANCES_LABEL ?? 'blog-comments'
const THEME = import.meta.env.VITE_UTTERANCES_THEME ?? 'github-light'
const UTTERANCES_ORIGIN = 'https://utteranc.es'

type CommentsWidgetProps = {
  title: string
}

export function CommentsWidget({ title }: CommentsWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation()

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
        {t('blog.comments.setupMissing')}
      </p>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mt-8 border-t border-gray-300 pt-6 max-w-2xl mx-auto"
    />
  )
}
