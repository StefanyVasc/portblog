import { cancel, intro } from '@clack/prompts'

import { appMenu } from './cli/app.mjs'
import {
  ACTION_EXIT,
  exitCli,
  formatError,
  selectWithNavigation
} from './cli/core.mjs'
import { gitMenu } from './cli/git.mjs'
import { postMenu } from './cli/post.mjs'
import { qualityMenu } from './cli/quality.mjs'

async function main() {
  intro('svs cli')

  while (true) {
    const section = await selectWithNavigation('O que você quer fazer?', [
      { value: 'git', label: 'Git tools' },
      { value: 'post', label: 'Post blog' },
      { value: 'quality', label: 'Qualidade de código' },
      { value: 'app', label: 'App (dev, build, preview)' }
    ])

    if (section === ACTION_EXIT) {
      exitCli()
    }

    if (section === 'git') await gitMenu()
    if (section === 'post') await postMenu()
    if (section === 'quality') await qualityMenu()
    if (section === 'app') await appMenu()
  }
}

main().catch(error => {
  cancel(formatError(error))
  process.exit(1)
})
