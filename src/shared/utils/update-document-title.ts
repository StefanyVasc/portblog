const SITE_NAME = 'Stefany Sá'

export function updateDocumentTitle(pageTitle?: string) {
  const title = pageTitle ? `${pageTitle} · ${SITE_NAME}` : SITE_NAME

  if (typeof document !== 'undefined') {
    document.title = title

    let metaTag = document.querySelector<HTMLMetaElement>(
      'meta[property="og:title"]'
    )

    if (!metaTag) {
      metaTag = document.createElement('meta')
      metaTag.setAttribute('property', 'og:title')
      document.head.appendChild(metaTag)
    }

    metaTag.setAttribute('content', title)
  }
}
