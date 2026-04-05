import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

const CHROME_BIN =
  process.env.CHROME_BIN ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const SVG_PATH = path.resolve('public/og-default.svg')
const PNG_PATH = path.resolve('public/og-default.png')
const SVG_FILE_URL = `file://${SVG_PATH}`

async function main() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'svs-og-'))
  const htmlPath = path.join(tempDir, 'og-preview.html')

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1200, initial-scale=1.0" />
    <style>
      html,
      body {
        margin: 0;
        width: 1200px;
        height: 630px;
        overflow: hidden;
        background: #fff8f1;
      }

      img {
        display: block;
        width: 1200px;
        height: 630px;
        object-fit: fill;
      }
    </style>
  </head>
  <body>
    <img src="${SVG_FILE_URL}" alt="" />
  </body>
</html>`

  await fs.writeFile(htmlPath, html, 'utf8')

  try {
    await execFileAsync(CHROME_BIN, [
      '--headless',
      '--disable-gpu',
      '--hide-scrollbars',
      '--default-background-color=00000000',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      `--screenshot=${PNG_PATH}`,
      `file://${htmlPath}`
    ])
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true })
  }

  console.log(`Rendered ${path.relative(process.cwd(), PNG_PATH)}`)
}

main().catch(error => {
  console.error('[render-og-png] Failed:', error)
  process.exitCode = 1
})
