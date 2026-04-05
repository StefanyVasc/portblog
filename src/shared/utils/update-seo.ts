import {
  SITE_AUTHOR,
  SITE_DEFAULT_IMAGE,
  SITE_DEFAULT_LOCALE,
  SITE_DEFAULT_ROBOTS,
  SITE_NAME,
  SITE_URL
} from '@/shared/config/site'

type StructuredData = Record<string, unknown>

type UpdateSeoOptions = {
  title: string
  description?: string
  canonicalPath?: string
  type?: 'website' | 'article' | string
  image?: string
  imageAlt?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
  robots?: string
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
    imageAlt,
    author = SITE_AUTHOR.name,
    publishedTime,
    modifiedTime,
    keywords = [],
    robots = SITE_DEFAULT_ROBOTS,
    structuredData
  } = options

  const fullTitle = `${title} · ${SITE_NAME}`
  document.title = fullTitle

  const origin = getSiteOrigin()
  const canonicalUrl = canonicalPath
    ? new URL(canonicalPath, origin).toString()
    : origin
  const resolvedImage = resolveUrl(image ?? SITE_DEFAULT_IMAGE, origin)
  const resolvedDescription = description ?? ''
  const keywordContent = keywords.join(', ')

  setMeta({ name: 'description', content: resolvedDescription })
  setMeta({ name: 'author', content: author })
  setMeta({ name: 'keywords', content: keywordContent })
  setMeta({ name: 'robots', content: robots })

  setMeta({ property: 'og:title', content: fullTitle })
  setMeta({ property: 'og:description', content: resolvedDescription })
  setMeta({ property: 'og:type', content: type })
  setMeta({ property: 'og:url', content: canonicalUrl })
  setMeta({ property: 'og:image', content: resolvedImage })
  setMeta({ property: 'og:image:alt', content: imageAlt ?? title })
  setMeta({ property: 'og:site_name', content: SITE_NAME })
  setMeta({ property: 'og:locale', content: SITE_DEFAULT_LOCALE })
  setMeta({ property: 'article:published_time', content: publishedTime })
  setMeta({ property: 'article:modified_time', content: modifiedTime })
  setMeta({ property: 'article:author', content: author })

  setMeta({ name: 'twitter:card', content: 'summary_large_image' })
  setMeta({ name: 'twitter:title', content: fullTitle })
  setMeta({ name: 'twitter:description', content: resolvedDescription })
  setMeta({ name: 'twitter:image', content: resolvedImage })
  setMeta({ name: 'twitter:image:alt', content: imageAlt ?? title })
  setMeta({ name: 'twitter:url', content: canonicalUrl })

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
  const selector = name
    ? `meta[name="${name}"]`
    : `meta[property="${property}"]`
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!content) {
    if (element) element.remove()
    return
  }

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

function resolveUrl(value: string, origin: string) {
  return new URL(value, origin).toString()
}
