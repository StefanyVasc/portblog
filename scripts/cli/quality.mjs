import { runMenu } from './core.mjs'
import { runNpmScript, runNpmScripts } from './process.mjs'

export async function qualityMenu() {
  await runMenu({
    message: 'Qualidade de código — o que você quer rodar?',
    includeBack: true,
    options: [
      {
        value: 'all',
        label: 'Rodar checagem completa (lint + format:check + typecheck)'
      },
      { value: 'lint', label: 'Lint' },
      { value: 'lint-fix', label: 'Lint com correção automática' },
      { value: 'format', label: 'Formatar arquivos' },
      { value: 'format-check', label: 'Verificar formatação' },
      { value: 'typecheck', label: 'Typecheck' }
    ],
    onSelect: async action => {
      if (action === 'all') {
        await runNpmScripts(
          [
            {
              script: 'lint',
              label: 'lint',
              failureMessage: '❌ Lint falhou.',
              hint: 'Revise os erros listados acima ou rode "Lint com correção automática" quando fizer sentido.'
            },
            {
              script: 'format:check',
              label: 'verificação de formatação',
              failureMessage:
                '❌ A verificação de formatação encontrou arquivos fora do padrão.',
              hint: 'Use a opção "Formatar arquivos" para aplicar o Prettier e tente novamente.'
            },
            {
              script: 'typecheck',
              label: 'typecheck',
              failureMessage: '❌ Typecheck falhou.',
              hint: 'Corrija os erros de tipagem listados acima e rode novamente.'
            }
          ],
          'checagem completa'
        )
      }

      if (action === 'lint') {
        await runNpmScript({
          script: 'lint',
          label: 'lint',
          failureMessage: '❌ Lint falhou.',
          hint: 'Revise os erros listados acima ou rode "Lint com correção automática" quando fizer sentido.'
        })
      }
      if (action === 'lint-fix')
        await runNpmScript({
          script: 'lint:fix',
          label: 'lint com correção',
          successMessage: 'Lint com correção automática concluído com sucesso.',
          failureMessage: '❌ Lint com correção automática falhou.',
          hint: 'Revise os erros restantes listados acima.'
        })
      if (action === 'format') {
        await runNpmScript({
          script: 'format',
          label: 'formatação',
          successMessage: 'Formatação aplicada com sucesso.',
          failureMessage: '❌ A formatação falhou.',
          hint: 'Revise a saída acima e tente novamente.'
        })
      }
      if (action === 'format-check') {
        await runNpmScript({
          script: 'format:check',
          label: 'verificação de formatação',
          failureMessage:
            '❌ A verificação de formatação encontrou arquivos fora do padrão.',
          hint: 'Use a opção "Formatar arquivos" para aplicar o Prettier e tente novamente.'
        })
      }
      if (action === 'typecheck') {
        await runNpmScript({
          script: 'typecheck',
          label: 'typecheck',
          failureMessage: '❌ Typecheck falhou.',
          hint: 'Corrija os erros de tipagem listados acima e rode novamente.'
        })
      }
    }
  })
}
