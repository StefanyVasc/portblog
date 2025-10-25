import { promises as fs } from 'fs'
import path from 'path'

const POSTS_DIR = path.resolve('public/posts')
const DEFAULT_LOCALE = 'pt'
const SUPPORTED_LOCALES = ['pt', 'en']

async function main() {
  const files = await fs.readdir(POSTS_DIR)
  const markdownFiles = files.filter(file => file.endsWith('.md'))

  const entries = new Map()

  for (const file of markdownFiles) {
    const filePath = path.join(POSTS_DIR, file)
    const raw = await fs.readFile(filePath, 'utf8')
    const { frontmatter } = parseFrontmatter(raw)

    const locale = extractLocale(file) ?? DEFAULT_LOCALE
    const baseSlug = extractSlug(file)
    const slug = sanitizeSlug(frontmatter.slug) || baseSlug
    const date = frontmatter.date ?? ''
    const title = frontmatter.title ?? ''
    const description = frontmatter.description ?? ''
    const tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags.map(String)
      : []

    if (!entries.has(slug)) {
      entries.set(slug, {
        slug,
        orderKey: deriveOrderKey(frontmatter.date, slug),
        locales: {}
      })
    }

    entries.get(slug).locales[locale] = {
      slug,
      title,
      description,
      date,
      tags
    }
  }

  const outputs = {}

  for (const locale of SUPPORTED_LOCALES) {
    const items = Array.from(entries.values())
      .map(entry => {
        const localized =
          entry.locales[locale] ??
          entry.locales[DEFAULT_LOCALE] ??
          Object.values(entry.locales)[0]

        if (!localized) {
          return null
        }

        return {
          slug: entry.slug,
          title: localized.title,
          description: localized.description,
          date: localized.date,
          tags: localized.tags
        }
      })
      .filter(Boolean)
      .sort((a, b) => {
        const aEntry = entries.get(a.slug)
        const bEntry = entries.get(b.slug)

        if (!aEntry || !bEntry) return 0

        if (aEntry.orderKey > bEntry.orderKey) return -1
        if (aEntry.orderKey < bEntry.orderKey) return 1
        return 0
      })

    outputs[locale] = { posts: items }
  }

  await Promise.all(
    SUPPORTED_LOCALES.map(locale => {
      const targetPath = path.join(
        POSTS_DIR,
        locale === DEFAULT_LOCALE ? 'posts.json' : `posts.${locale}.json`
      )
      const content = JSON.stringify(outputs[locale], null, 2).concat('\n')
      return fs.writeFile(targetPath, content, 'utf8')
    })
  )
}

function parseFrontmatter(source) {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!match) {
    return { frontmatter: {}, body: source }
  }

  const rawFrontmatter = match[1].split('\n')

  const frontmatter = {}

  for (const line of rawFrontmatter) {
    const [key, ...rest] = line.split(':')
    if (!key || rest.length === 0) {
      continue
    }

    const value = rest.join(':').trim()

    if (value.startsWith('-')) {
      continue
    }

    frontmatter[key.trim()] = parseFrontmatterValue(value)
  }

  const body = source.slice(match[0].length)

  // Parse array values (simple list)
  const arrayMatches = rawFrontmatter.reduce((acc, line, index) => {
    if (line.trim().endsWith(':')) {
      const key = line.replace(':', '').trim()
      const values = []
      for (let i = index + 1; i < rawFrontmatter.length; i += 1) {
        const item = rawFrontmatter[i]
        if (!item.trim().startsWith('-')) break
        values.push(item.replace('-', '').trim())
      }
      if (values.length > 0) {
        acc[key] = values
      }
    }
    return acc
  }, {})

  return {
    frontmatter: { ...frontmatter, ...arrayMatches },
    body
  }
}

function parseFrontmatterValue(value) {
  const cleaned = value.replace(/^['"]|['"]$/g, '')
  if (cleaned === 'true') return true
  if (cleaned === 'false') return false
  return cleaned
}

function extractLocale(fileName) {
  if (fileName.endsWith('.pt.md')) return 'pt'
  if (fileName.endsWith('.en.md')) return 'en'
  return null
}

function extractSlug(fileName) {
  return fileName
    .replace(/\.pt\.md$/i, '')
    .replace(/\.en\.md$/i, '')
    .replace(/\.md$/i, '')
}

function sanitizeSlug(value) {
  if (!value || typeof value !== 'string') return ''
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
}

function deriveOrderKey(date, slug) {
  const isoFromSlug = slug.match(/^\d{4}-\d{2}-\d{2}/)?.[0]
  if (isoFromSlug) return isoFromSlug

  const parsedDate = new Date(date)
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toISOString().slice(0, 10)
  }

  return slug
}

main().catch(error => {
  console.error('[generate-posts-index] Failed:', error)
  process.exitCode = 1
})
