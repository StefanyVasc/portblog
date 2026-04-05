import { execFileSync, spawnSync } from 'child_process'

import {
  bold,
  formatAction,
  formatCommand,
  printStart,
  printSuccess
} from './core.mjs'

const NPM_BIN = process.platform === 'win32' ? 'npm.cmd' : 'npm'

function createCommandError({ failureMessage, hint, status }) {
  const lines = [failureMessage]

  if (typeof status === 'number') {
    lines.push(`Código de saída: ${status}.`)
  }

  if (hint) {
    lines.push(hint)
  }

  return new Error(lines.join('\n'))
}

function normalizeTask(task) {
  if (typeof task === 'string') {
    return {
      script: task,
      startMessage: `${bold(task)}...`,
      successMessage: `${bold(task)} com sucesso.`,
      failureMessage: `❌ ${task} falhou.`
    }
  }

  return {
    startMessage: `${bold(task.label)}...`,
    successMessage: `${bold(task.label)} com sucesso.`,
    failureMessage: `❌ ${task.label} falhou.`,
    ...task
  }
}

export function capture(command, args = []) {
  return execFileSync(command, args, { encoding: 'utf-8' }).trim()
}

export function runQuiet(command, args = []) {
  execFileSync(command, args, { encoding: 'utf-8' })
}

export function runInteractive(command, args = [], errorOptions = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit'
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw createCommandError({
      status: result.status,
      ...errorOptions
    })
  }
}

export async function runNpmScript(task) {
  const config = normalizeTask(task)

  printStart(config.startMessage)
  runInteractive(NPM_BIN, ['run', config.script], {
    failureMessage: config.failureMessage,
    hint: config.hint
  })
  printSuccess(config.successMessage)
}

export async function runNpmScripts(tasks, label) {
  printStart(`${bold(label)}...`)

  for (const task of tasks) {
    const config = normalizeTask(task)

    console.log(
      `${formatAction('Rodando', 'blue')} ${formatCommand(`npm run ${config.script}`)}`
    )
    runInteractive(NPM_BIN, ['run', config.script], {
      failureMessage: config.failureMessage,
      hint: config.hint
    })
    console.log()
    printSuccess(config.successMessage)
  }

  printSuccess(`${bold(label)} com sucesso.`)
}
