import { promises as fs } from 'fs'
import path from 'path'

const POSTS_DIR = path.resolve('public/posts')
const INDEX_FILE = path.join(POSTS_DIR, 'posts.json')
const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

async function main() {
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
      const formattedDate = isoDate ? formatDate(isoDate) : ''

      return {
        slug,
        title: frontmatter.title ?? slug,
        description: frontmatter.description ?? '',
        date: formattedDate,
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

function capitalize(text) {
  if (!text) return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

main().catch(error => {
  console.error('[generate-posts-index] Failed:', error)
  process.exitCode = 1
})
