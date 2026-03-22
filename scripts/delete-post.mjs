import { promises as fs } from 'fs'
import path from 'path'

const POSTS_DIR = path.resolve('public/posts')
const INDEX_FILE = path.join(POSTS_DIR, 'posts.json')

async function main() {
  const slug = process.argv[2]?.trim()

  if (!slug) {
    console.error('Usage: npm run delete:post -- <slug>')
    console.error('Example: npm run delete:post -- 2026-03-22-meu-post')
    process.exitCode = 1
    return
  }

  let deleted = false

  const mdFile = path.join(POSTS_DIR, `${slug}.md`)
  try {
    await fs.unlink(mdFile)
    console.log(`Deleted: ${mdFile}`)
    deleted = true
  } catch {
    console.warn(`File not found: ${mdFile}`)
  }

  try {
    const raw = await fs.readFile(INDEX_FILE, 'utf8')
    const { posts } = JSON.parse(raw)
    const filtered = posts.filter(p => p.slug !== slug)

    if (filtered.length < posts.length) {
      const payload = JSON.stringify({ posts: filtered }, null, 2).concat('\n')
      await fs.writeFile(INDEX_FILE, payload, 'utf8')
      console.log(`Removed "${slug}" from posts.json`)
      deleted = true
    } else {
      console.warn(`Entry "${slug}" not found in posts.json`)
    }
  } catch {
    console.warn('Could not update posts.json')
  }

  if (!deleted) {
    console.error(`No post found with slug "${slug}"`)
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error('[delete-post] Failed:', error)
  process.exitCode = 1
})
