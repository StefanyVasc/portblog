import { confirm, isCancel, multiselect, spinner, text } from '@clack/prompts'

import { formatAction, printMessage, runMenu } from './core.mjs'
import { capture, runQuiet } from './process.mjs'

async function gitBranch() {
  const name = await text({
    message: 'Nome da branch:',
    validate: value => (value.trim() ? undefined : 'Nome não pode ser vazio.')
  })

  if (isCancel(name)) {
    return
  }

  const hasChanges = capture('git', ['status', '--porcelain']) !== ''
  const s = spinner()

  if (hasChanges) {
    s.start(`${formatAction('Guardando')} mudanças pendentes...`)
    runQuiet('git', ['stash', 'push', '-m', 'cli stash temporário'])
    s.stop(`${formatAction('Criado', 'green')} stash temporário.`)
  }

  s.start(`${formatAction('Atualizando')} main...`)
  runQuiet('git', ['checkout', 'main'])
  runQuiet('git', ['pull'])
  s.stop(`${formatAction('Atualizada', 'green')} main.`)

  s.start(`${formatAction('Criando')} branch "${name}"...`)
  runQuiet('git', ['checkout', '-b', name])
  s.stop(`${formatAction('Criada', 'green')} branch "${name}".`)

  if (hasChanges) {
    s.start(`${formatAction('Restaurando')} mudanças...`)
    runQuiet('git', ['stash', 'pop'])
    s.stop(`${formatAction('Restauradas', 'green')} mudanças.`)
  }

  printMessage(`Pronto! Você está na branch "${name}".`)
}

function listLocalBranches() {
  return capture('git', ['branch'])
    .split('\n')
    .map(branch => branch.trim().replace(/^\* /, ''))
    .filter(branch => branch && branch !== 'main')
}

async function gitCleanupSelect() {
  const branches = listLocalBranches()

  if (branches.length === 0) {
    printMessage('Nenhuma branch local para remover.')
    return
  }

  const selected = await multiselect({
    message: 'Selecione as branches para remover:',
    options: branches.map(branch => ({ value: branch, label: branch })),
    required: true
  })

  if (isCancel(selected)) {
    return
  }

  const ok = await confirm({
    message: `Remover ${selected.length} branch(es)?`
  })

  if (isCancel(ok) || !ok) {
    return
  }

  const s = spinner()
  s.start(`${formatAction('Removendo')} branches...`)
  runQuiet('git', ['branch', '-D', ...selected])
  s.stop(`${formatAction('Removidas', 'green')} ${selected.length} branch(es).`)

  printMessage('Limpeza concluída.')
}

async function gitCleanupAll() {
  const branches = listLocalBranches()

  if (branches.length === 0) {
    printMessage('Nenhuma branch local para remover.')
    return
  }

  const ok = await confirm({
    message: `Remover todas as ${branches.length} branches locais?`
  })

  if (isCancel(ok) || !ok) {
    return
  }

  const s = spinner()
  s.start(`${formatAction('Removendo')} todas as branches...`)
  runQuiet('git', ['branch', '-D', ...branches])
  s.stop(`${formatAction('Removidas', 'green')} ${branches.length} branch(es).`)

  printMessage('Limpeza concluída.')
}

export async function gitMenu() {
  await runMenu({
    message: 'Git tools — o que você quer fazer?',
    includeBack: true,
    options: [
      { value: 'branch', label: 'Criar nova branch a partir da main' },
      { value: 'cleanup-select', label: 'Remover branches selecionadas' },
      { value: 'cleanup-all', label: 'Remover todas as branches locais' }
    ],
    onSelect: async action => {
      if (action === 'branch') await gitBranch()
      if (action === 'cleanup-select') await gitCleanupSelect()
      if (action === 'cleanup-all') await gitCleanupAll()
    }
  })
}
