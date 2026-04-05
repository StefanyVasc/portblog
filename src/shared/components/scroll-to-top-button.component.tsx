import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/shared/components'

const VISIBILITY_THRESHOLD = 480

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > VISIBILITY_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="ghost"
      onClick={handleScrollToTop}
      aria-label="Voltar ao topo da página"
      className={`fixed bottom-5 right-4 z-50 rounded-full border border-rose-500 bg-rose-500 px-4 text-white shadow-lg transition-all duration-200 hover:bg-rose-600 hover:text-white focus-visible:ring-rose-500 sm:bottom-6 sm:right-6 ${
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp size={16} />
      Topo
    </Button>
  )
}
