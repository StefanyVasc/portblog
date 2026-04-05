import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { resolveSiteUrl } from '../seo/site-url.mjs'

const POSTS_DIR = path.resolve('public/posts')
const INDEX_FILE = path.join(POSTS_DIR, 'posts.json')
const SITEMAP_FILE = path.resolve('public', 'sitemap.xml')
const SITE_URL = resolveSiteUrl()
const STATIC_ROUTES = [
  '/',
  '/about',
  '/blog',
  '/links',
  '/projects',
  '/challenges',
  '/challenges/frontend-mentor/newbie',
  '/challenges/frontend-mentor/junior',
  '/challenges/frontend-mentor/intermediate',
  '/challenges/frontend-mentor/advanced',
  '/challenges/bora-codar'
]
const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

export async function generatePostsIndex() {
  const files = (await fs.readdir(POSTS_DIR)).filter(file =>
    file.endsWith('.md')
  )

  const entries = await Promise.all(
    files.map(async fileName => {
      const filePath = path.join(POSTS_DIR, fileName)
      const raw = await fs.readFile(filePath, 'utf8')
      const { frontmatter } = parseFrontmatter(raw)

      const slugFromFile = fileName.replace(/\.md$/i, '')
      const slug = sanitizeSlug(frontmatter.slug) || slugFromFile

      const isoDate = normalizeDate(frontmatter.date, slug)
      const dateTimeIso = toMetadataDateTime(isoDate)
      const formattedDate = isoDate ? formatDate(isoDate) : ''

      return {
        slug,
        title: frontmatter.title ?? slug,
        seoTitle: sanitizeText(frontmatter.seoTitle),
        description: frontmatter.description ?? '',
        seoDescription: sanitizeText(frontmatter.seoDescription),
        coverImage: sanitizeAssetUrl(frontmatter.coverImage),
        date: formattedDate,
        dateIso: isoDate,
        dateTimeIso,
        tags: Array.isArray(frontmatter.tags)
          ? frontmatter.tags.map(tag => String(tag))
          : [],
        sortKey: isoDate ?? slug
      }
    })
  )

  const ordered = entries
    .filter(entry => entry.slug)
    .sort((a, b) => {
      if (a.sortKey > b.sortKey) return -1
      if (a.sortKey < b.sortKey) return 1
      return 0
    })
    .map(({ sortKey, ...rest }) => rest)

  const payload = JSON.stringify({ posts: ordered }, null, 2).concat('\n')
  await fs.writeFile(INDEX_FILE, payload, 'utf8')

  const sitemap = buildSitemap(ordered)
  await fs.writeFile(SITEMAP_FILE, sitemap, 'utf8')

  return {
    count: ordered.length,
    indexFile: INDEX_FILE,
    sitemapFile: SITEMAP_FILE
  }
}

export async function deletePostBySlug(slug) {
  const normalizedSlug = slug?.trim()

  if (!normalizedSlug) {
    throw new Error('Slug não pode ser vazio.')
  }

  let fileDeleted = false
  let indexUpdated = false

  const mdFile = path.join(POSTS_DIR, `${normalizedSlug}.md`)
  try {
    await fs.unlink(mdFile)
    fileDeleted = true
  } catch {
    fileDeleted = false
  }

  try {
    const raw = await fs.readFile(INDEX_FILE, 'utf8')
    const { posts } = JSON.parse(raw)
    const filtered = posts.filter(post => post.slug !== normalizedSlug)

    if (filtered.length < posts.length) {
      const payload = JSON.stringify({ posts: filtered }, null, 2).concat('\n')
      await fs.writeFile(INDEX_FILE, payload, 'utf8')
      indexUpdated = true
    }
  } catch {
    indexUpdated = false
  }

  if (!fileDeleted && !indexUpdated) {
    throw new Error(`Nenhum post encontrado com o slug "${normalizedSlug}".`)
  }

  return {
    slug: normalizedSlug,
    fileDeleted,
    indexUpdated,
    mdFile,
    indexFile: INDEX_FILE
  }
}

async function main() {
  const command = process.argv[2]?.trim()

  if (!command) {
    printUsage()
    process.exitCode = 1
    return
  }

  if (command === 'generate') {
    const result = await generatePostsIndex()
    console.log(`Generated ${result.count} post(s).`)
    console.log(`Updated: ${result.indexFile}`)
    console.log(`Updated: ${result.sitemapFile}`)
    return
  }

  if (command === 'delete') {
    const slug = process.argv[3]?.trim()

    if (!slug) {
      console.error('Usage: node scripts/posts/index.mjs delete <slug>')
      console.error(
        'Example: node scripts/posts/index.mjs delete 2026-03-22-meu-post'
      )
      process.exitCode = 1
      return
    }

    const result = await deletePostBySlug(slug)
    if (result.fileDeleted) {
      console.log(`Deleted: ${result.mdFile}`)
    } else {
      console.warn(`File not found: ${result.mdFile}`)
    }

    if (result.indexUpdated) {
      console.log(`Removed "${slug}" from posts.json`)
    } else {
      console.warn(`Entry "${slug}" not found in posts.json`)
    }

    return
  }

  printUsage()
  process.exitCode = 1
}

function printUsage() {
  console.error('Usage: node scripts/posts/index.mjs <generate|delete> [slug]')
  console.error('Examples:')
  console.error('  node scripts/posts/index.mjs generate')
  console.error('  node scripts/posts/index.mjs delete 2026-03-22-meu-post')
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!match) {
    return { frontmatter: {}, body: source }
  }

  const rawFrontmatter = match[1].split('\n')
  const frontmatter = {}

  for (const line of rawFrontmatter) {
    if (!line.includes(':')) continue

    const [rawKey, ...rest] = line.split(':')
    const key = rawKey.trim()
    const value = rest.join(':').trim()

    if (!key) continue
    if (value === '') {
      frontmatter[key] = []
      continue
    }

    if (value.startsWith('-')) continue

    frontmatter[key] = parseFrontmatterValue(value)
  }

  rawFrontmatter.forEach((line, index) => {
    const trimmed = line.trim()
    if (!trimmed.endsWith(':')) return

    const key = trimmed.slice(0, -1)
    const values = []

    for (let i = index + 1; i < rawFrontmatter.length; i += 1) {
      const item = rawFrontmatter[i]
      if (!item.trim().startsWith('-')) break
      values.push(item.replace('-', '').trim())
    }

    if (values.length > 0) {
      frontmatter[key] = values
    }
  })

  return { frontmatter, body: source.slice(match[0].length) }
}

function parseFrontmatterValue(value) {
  const cleaned = value.replace(/^['"]|['"]$/g, '')
  if (cleaned === 'true') return true
  if (cleaned === 'false') return false
  return cleaned
}

function sanitizeSlug(value) {
  if (!value || typeof value !== 'string') return ''
  return value.trim().toLowerCase()
}

function sanitizeText(value) {
  if (!value || typeof value !== 'string') return undefined

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

function sanitizeAssetUrl(value) {
  if (!value || typeof value !== 'string') return undefined

  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

function normalizeDate(rawDate, slug) {
  if (typeof rawDate === 'string' && rawDate.trim().length > 0) {
    const cleaned = rawDate.trim()
    if (!Number.isNaN(Date.parse(cleaned))) {
      return cleaned.slice(0, 10)
    }
  }

  const slugMatch = slug.match(/^\d{4}-\d{2}-\d{2}/)
  if (slugMatch) {
    return slugMatch[0]
  }

  return ''
}

function formatDate(isoDate) {
  try {
    const parsed = new Date(`${isoDate}T00:00:00Z`)
    if (Number.isNaN(parsed.getTime())) return ''
    const formatted = DATE_FORMATTER.format(parsed)
    return capitalize(formatted)
  } catch {
    return ''
  }
}

function toMetadataDateTime(isoDate) {
  if (!isoDate) return undefined
  return `${isoDate}T12:00:00-03:00`
}

function capitalize(text) {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function buildSitemap(posts) {
  const today = new Date().toISOString().slice(0, 10)

  const urls = [
    ...STATIC_ROUTES.map(routePath => ({
      loc: new URL(routePath, SITE_URL).toString(),
      lastmod: today
    })),
    ...posts.map(post => ({
      loc: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
      lastmod: post.dateIso || today
    }))
  ]

  const nodes = urls
    .map(
      ({ loc, lastmod }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nodes}\n</urlset>\n`
}

const currentFile = fileURLToPath(import.meta.url)
const executedFile = process.argv[1] ? path.resolve(process.argv[1]) : ''

if (executedFile === currentFile) {
  main().catch(error => {
    console.error('[posts] Failed:', error)
    process.exitCode = 1
  })
}
