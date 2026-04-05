import { runMenu } from './core.mjs'
import { runNpmScript } from './process.mjs'

export async function appMenu() {
  await runMenu({
    message: 'App — o que você quer rodar?',
    includeBack: true,
    options: [
      { value: 'dev', label: 'Dev' },
      { value: 'build', label: 'Build' },
      { value: 'preview', label: 'Preview' }
    ],
    onSelect: async action => {
      if (action === 'dev')
        await runNpmScript('dev', 'ambiente de desenvolvimento')
      if (action === 'build') await runNpmScript('build', 'build')
      if (action === 'preview') await runNpmScript('preview', 'preview')
    }
  })
}
