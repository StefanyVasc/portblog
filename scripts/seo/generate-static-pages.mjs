import { promises as fs } from 'fs'
import path from 'path'

import { resolveSiteUrl } from './site-url.mjs'

const DIST_DIR = path.resolve('dist')
const DIST_INDEX_FILE = path.join(DIST_DIR, 'index.html')
const DIST_POSTS_FILE = path.join(DIST_DIR, 'posts', 'posts.json')
const SITE_URL = resolveSiteUrl()
const SITE_NAME = 'stefany sá'
const SITE_AUTHOR = 'stefany sá'
const DEFAULT_IMAGE = new URL('/og-default.png', SITE_URL).toString()
const BLOG_TITLE = 'blog'
const BLOG_DESCRIPTION =
  'Artigos sobre desenvolvimento front-end, arquitetura, boas práticas e estudos que estou registrando ao longo da jornada.'
const ROUTE_PAGES = [
  {
    path: '/',
    title: 'início',
    description:
      'Portfólio vivo da stefany sá: projetos, artigos e experimentos em frontend, UX e arquitetura de interfaces.',
    type: 'website',
    schemaType: 'WebSite'
  },
  {
    path: '/about',
    title: 'sobre',
    description:
      'Conheça minha trajetória como desenvolvedora front-end, tecnologias favoritas e experiências profissionais.',
    type: 'website',
    schemaType: 'AboutPage'
  },
  {
    path: '/blog',
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/links',
    title: 'links',
    description:
      'Página com os principais links da stefany sá: blog, GitHub, LinkedIn, Instagram, X, Medium, Unsplash e YouTube.',
    type: 'website',
    schemaType: 'ProfilePage'
  },
  {
    path: '/projects',
    title: 'projetos',
    description:
      'Seleção dos projetos que desenvolvi e mantenho, com links para o código e previews quando disponíveis.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges',
    title: 'desafios',
    description:
      'Coleção dos desafios que estou realizando em plataformas como Frontend Mentor e Bora Codar.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges/frontend-mentor',
    title: 'frontend mentor',
    description:
      'Acompanhamento dos desafios do Frontend Mentor por nível de dificuldade.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges/frontend-mentor/newbie',
    title: 'frontend mentor · newbie',
    description:
      'Acompanhamento dos desafios do Frontend Mentor por nível de dificuldade.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges/frontend-mentor/junior',
    title: 'frontend mentor · junior',
    description:
      'Acompanhamento dos desafios do Frontend Mentor por nível de dificuldade.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges/frontend-mentor/intermediate',
    title: 'frontend mentor · intermediate',
    description:
      'Acompanhamento dos desafios do Frontend Mentor por nível de dificuldade.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges/frontend-mentor/advanced',
    title: 'frontend mentor · advanced',
    description:
      'Acompanhamento dos desafios do Frontend Mentor por nível de dificuldade.',
    type: 'website',
    schemaType: 'CollectionPage'
  },
  {
    path: '/challenges/bora-codar',
    title: 'bora codar',
    description:
      'Coleção dos desafios Bora Codar que estou resolvendo e documentando.',
    type: 'website',
    schemaType: 'CollectionPage'
  }
]

async function main() {
  const [template, rawPosts] = await Promise.all([
    fs.readFile(DIST_INDEX_FILE, 'utf8'),
    fs.readFile(DIST_POSTS_FILE, 'utf8')
  ])

  const { posts } = JSON.parse(rawPosts)

  await Promise.all(
    ROUTE_PAGES.map(route =>
      writeHtml(
        getOutputPath(route.path),
        renderPage(template, {
          title: route.title,
          description: route.description,
          canonicalPath: route.path,
          type: route.type,
          schemaType: route.schemaType
        })
      )
    )
  )

  await Promise.all(
    posts.map(post =>
      writeHtml(
        getOutputPath(`/blog/${post.slug}`),
        renderPage(template, {
          title: post.seoTitle || post.title,
          description:
            post.seoDescription || post.description || BLOG_DESCRIPTION,
          canonicalPath: `/blog/${post.slug}`,
          type: 'article',
          image: post.coverImage,
          imageAlt: post.title,
          publishedTime: post.dateIso || undefined,
          modifiedTime: post.dateIso || undefined,
          keywords: Array.isArray(post.tags) ? post.tags : [],
          schemaType: 'BlogPosting'
        })
      )
    )
  )

  console.log(`Generated static SEO pages for ${posts.length} post(s).`)
}

async function writeHtml(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, content, 'utf8')
}

function getOutputPath(routePath) {
  if (routePath === '/') return path.join(DIST_DIR, 'index.html')

  return path.join(DIST_DIR, routePath.replace(/^\//, ''), 'index.html')
}

function renderPage(template, options) {
  const fullTitle = `${options.title} · ${SITE_NAME}`
  const canonicalUrl = new URL(options.canonicalPath, SITE_URL).toString()
  const image = resolveUrl(options.image ?? DEFAULT_IMAGE)
  const imageAlt = options.imageAlt ?? options.title
  const keywords = options.keywords?.join(', ') ?? ''
  const structuredData = buildStructuredData({
    ...options,
    canonicalUrl,
    image
  })

  let html = template

  html = replaceTitle(html, fullTitle)
  html = setMetaTag(html, { name: 'description', content: options.description })
  html = setMetaTag(html, { name: 'author', content: SITE_AUTHOR })
  html = setMetaTag(html, { name: 'keywords', content: keywords })
  html = setMetaTag(html, { name: 'robots', content: 'index,follow' })
  html = setMetaTag(html, { property: 'og:site_name', content: SITE_NAME })
  html = setMetaTag(html, { property: 'og:locale', content: 'pt_BR' })
  html = setMetaTag(html, { property: 'og:title', content: fullTitle })
  html = setMetaTag(html, {
    property: 'og:description',
    content: options.description
  })
  html = setMetaTag(html, { property: 'og:type', content: options.type })
  html = setMetaTag(html, { property: 'og:url', content: canonicalUrl })
  html = setMetaTag(html, { property: 'og:image', content: image })
  html = setMetaTag(html, { property: 'og:image:alt', content: imageAlt })
  html = setMetaTag(html, {
    property: 'og:image:width',
    content: '1200'
  })
  html = setMetaTag(html, {
    property: 'og:image:height',
    content: '1200'
  })
  html = setMetaTag(html, {
    property: 'article:published_time',
    content: options.type === 'article' ? options.publishedTime : undefined
  })
  html = setMetaTag(html, {
    property: 'article:modified_time',
    content: options.type === 'article' ? options.modifiedTime : undefined
  })
  html = setMetaTag(html, {
    property: 'article:author',
    content: options.type === 'article' ? SITE_AUTHOR : undefined
  })
  html = setMetaTag(html, {
    name: 'twitter:card',
    content: 'summary_large_image'
  })
  html = setMetaTag(html, { name: 'twitter:title', content: fullTitle })
  html = setMetaTag(html, {
    name: 'twitter:description',
    content: options.description
  })
  html = setMetaTag(html, { name: 'twitter:image', content: image })
  html = setMetaTag(html, { name: 'twitter:image:alt', content: imageAlt })
  html = setMetaTag(html, { name: 'twitter:url', content: canonicalUrl })
  html = setCanonicalLink(html, canonicalUrl)
  html = setStructuredData(html, structuredData)

  return html
}

function replaceTitle(html, title) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(title)}</title>`
  )
}

function setMetaTag(html, { name, property, content }) {
  const selector = name
    ? new RegExp(
        `<meta\\s+name="${escapeRegExp(name)}"\\s+content="[^"]*"\\s*\\/?>`,
        'i'
      )
    : new RegExp(
        `<meta\\s+property="${escapeRegExp(property)}"\\s+content="[^"]*"\\s*\\/?>`,
        'i'
      )

  if (!content) {
    return html.replace(selector, '')
  }

  const tag = name
    ? `<meta name="${name}" content="${escapeHtmlAttribute(content)}" />`
    : `<meta property="${property}" content="${escapeHtmlAttribute(content)}" />`

  if (selector.test(html)) {
    return html.replace(selector, tag)
  }

  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function setCanonicalLink(html, href) {
  const linkTag = `<link rel="canonical" href="${escapeHtmlAttribute(href)}" />`
  const canonicalRegex = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i

  if (canonicalRegex.test(html)) {
    return html.replace(canonicalRegex, linkTag)
  }

  return html.replace('</head>', `    ${linkTag}\n  </head>`)
}

function setStructuredData(html, data) {
  const scriptTag = `<script type="application/ld+json" id="seo-structured-data">${escapeScriptContent(
    JSON.stringify(data)
  )}</script>`
  const existingRegex =
    /<script type="application\/ld\+json" id="seo-structured-data">[\s\S]*?<\/script>/i

  if (existingRegex.test(html)) {
    return html.replace(existingRegex, scriptTag)
  }

  return html.replace('</head>', `    ${scriptTag}\n  </head>`)
}

function buildStructuredData(options) {
  if (options.type !== 'article') {
    return {
      '@context': 'https://schema.org',
      '@type': options.schemaType ?? 'WebPage',
      name: SITE_NAME,
      url: canonicalUrlWithoutTrailingSlash(options.canonicalUrl),
      description: options.description,
      inLanguage: 'pt-BR'
    }
  }

  return {
    '@context': 'https://schema.org',
    '@type': options.schemaType ?? 'BlogPosting',
    headline: options.title,
    description: options.description,
    image: options.image,
    datePublished: options.publishedTime,
    dateModified: options.modifiedTime,
    url: options.canonicalUrl,
    inLanguage: 'pt-BR',
    mainEntityOfPage: options.canonicalUrl,
    author: {
      '@type': 'Person',
      name: SITE_AUTHOR,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Person',
      name: SITE_AUTHOR,
      url: SITE_URL
    },
    isPartOf: {
      '@type': 'Blog',
      name: BLOG_TITLE,
      url: new URL('/blog', SITE_URL).toString()
    },
    keywords: options.keywords.join(', ')
  }
}

function canonicalUrlWithoutTrailingSlash(url) {
  return url.endsWith('/') && url !== `${SITE_URL}/` ? url.slice(0, -1) : url
}

function resolveUrl(value) {
  return new URL(value, SITE_URL).toString()
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtmlAttribute(text) {
  return escapeHtml(text).replace(/"/g, '&quot;')
}

function escapeScriptContent(text) {
  return text.replace(/<\/script/gi, '<\\/script')
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

main().catch(error => {
  console.error('[generate-static-pages] Failed:', error)
  process.exitCode = 1
})
