import { useEffect, useState } from 'react'

import { createDiscussionIfNotExists } from '../utils'

export function GiscusComments({ title }: { title: string }) {
  const [discussionUrl, setDiscussionUrl] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  function injectGiscus() {
    // Remove qualquer script antigo para evitar duplicação
    const giscusContainer = document.getElementById('giscus-container')
    if (giscusContainer) {
      giscusContainer.innerHTML = ''
    }

    // Cria o script do Giscus
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'StefanyVasc/portblog')
    script.setAttribute('data-repo-id', 'R_kgDOOFddOA')
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', 'DIC_kwDOOFddOM4CoAIC')
    script.setAttribute('data-term', title)
    script.setAttribute('data-mapping', 'specific')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'noborder_light')
    script.setAttribute('data-lang', 'pt')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    // Adiciona o script ao contêiner do Giscus
    document.getElementById('giscus-container')?.appendChild(script)
  }

  useEffect(() => {
    function handleStorageEvent(event: StorageEvent) {
      if (event.key === 'giscus-session' && event.newValue) {
        injectGiscus() //  Reinjeta o Giscus após o login
      }
    }

    window.addEventListener('storage', handleStorageEvent)
    return () => window.removeEventListener('storage', handleStorageEvent)
  }, [])

  useEffect(() => {
    async function checkOrCreateDiscussion() {
      if (isChecking) return // Evita chamadas duplicadas
      setIsChecking(true)

      const url = await createDiscussionIfNotExists(title)

      if (url) {
        setDiscussionUrl(url)
        injectGiscus() //  Injeta o Giscus após a Discussion ser encontrada
      }

      setIsChecking(false)
    }

    checkOrCreateDiscussion()
  }, [title])

  return (
    <div>
      {discussionUrl ? (
        <div
          id="giscus-container"
          className="mt-8 border-t border-gray-300 pt-6 max-w-2xl mx-auto"
        ></div>
      ) : (
        <p>Carregando comentários...</p>
      )}
    </div>
  )
}
