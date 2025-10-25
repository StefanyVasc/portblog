import { SITE_DEFAULT_IMAGE, SITE_NAME, SITE_URL } from '@/shared/config/site'

type StructuredData = Record<string, unknown>

type UpdateSeoOptions = {
  title: string
  description?: string
  canonicalPath?: string
  type?: 'website' | 'article' | string
  image?: string
  structuredData?: StructuredData | StructuredData[]
}

const STRUCTURED_DATA_ELEMENT_ID = 'seo-structured-data'

export function updateSeo(options: UpdateSeoOptions) {
  if (typeof document === 'undefined') return

  const {
    title,
    description,
    canonicalPath,
    type = 'website',
    image,
    structuredData
  } = options

  const fullTitle = `${title} · ${SITE_NAME}`
  document.title = fullTitle

  const origin = getSiteOrigin()
  const canonicalUrl = canonicalPath
    ? new URL(canonicalPath, origin).toString()
    : origin

  setMeta({ name: 'description', content: description })

  setMeta({ property: 'og:title', content: fullTitle })
  setMeta({ property: 'og:description', content: description })
  setMeta({ property: 'og:type', content: type })
  setMeta({ property: 'og:url', content: canonicalUrl })
  setMeta({ property: 'og:image', content: image ?? SITE_DEFAULT_IMAGE })

  setMeta({ name: 'twitter:card', content: 'summary_large_image' })
  setMeta({ name: 'twitter:title', content: fullTitle })
  setMeta({ name: 'twitter:description', content: description })
  setMeta({ name: 'twitter:image', content: image ?? SITE_DEFAULT_IMAGE })

  setCanonicalLink(canonicalUrl)
  updateStructuredData(structuredData)
}

function setMeta({
  name,
  property,
  content
}: {
  name?: string
  property?: string
  content?: string
}) {
  if (!content) return

  const selector = name
    ? `meta[name="${name}"]`
    : `meta[property="${property}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    if (name) element.setAttribute('name', name)
    if (property) element.setAttribute('property', property)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', href)
}

function updateStructuredData(data?: StructuredData | StructuredData[]) {
  const existing = document.getElementById(STRUCTURED_DATA_ELEMENT_ID)

  if (!data) {
    if (existing) existing.remove()
    return
  }

  const scriptContent = Array.isArray(data) ? data : [data]
  const payload = JSON.stringify(
    scriptContent.length === 1 ? scriptContent[0] : scriptContent
  )

  let script = existing as HTMLScriptElement | null

  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = STRUCTURED_DATA_ELEMENT_ID
    document.head.appendChild(script)
  }

  script.textContent = payload
}

function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return SITE_URL
}
