import { cancel, isCancel, outro, select } from '@clack/prompts'

export const ACTION_BACK = '__back'
export const ACTION_EXIT = '__exit'

const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
}

function paint(text, ...styles) {
  if (process.env.NO_COLOR) {
    return text
  }

  return `${styles.join('')}${text}${ANSI.reset}`
}

export function bold(text) {
  return paint(text, ANSI.bold)
}

export function color(text, tone) {
  return paint(text, ANSI[tone] ?? '', ANSI.bold)
}

export function formatAction(verb, tone = 'cyan') {
  return color(verb, tone)
}

export function formatCommand(command) {
  return paint(command, ANSI.gray, ANSI.bold)
}

function printCallout(icon, verb, message, tone) {
  console.log(`\n${icon} ${formatAction(verb, tone)} ${message}\n`)
}

export function exitCli(message = 'CLI encerrado.') {
  outro(message)
  process.exit(0)
}

export function formatError(error) {
  if (!error) return 'Erro desconhecido.'

  const stderr = error.stderr?.toString().trim()
  if (stderr) return stderr

  const stdout = error.stdout?.toString().trim()
  if (stdout) return stdout

  return error.message ?? String(error)
}

export function printMessage(message) {
  console.log(`\n${message}\n`)
}

export function printStart(message) {
  printCallout('🚀', 'Executando', message, 'cyan')
}

export function printSuccess(message) {
  printCallout('✅', 'Concluído', message, 'green')
}

function withNavOptions(options, includeBack = false) {
  const items = [...options]

  if (includeBack) {
    items.push({ value: ACTION_BACK, label: 'Voltar' })
  }

  items.push({ value: ACTION_EXIT, label: 'Sair' })
  return items
}

export async function selectWithNavigation(
  message,
  options,
  includeBack = false
) {
  const result = await select({
    message,
    options: withNavOptions(options, includeBack)
  })

  if (isCancel(result)) {
    return includeBack ? ACTION_BACK : ACTION_EXIT
  }

  return result
}

export async function runMenu({
  message,
  options,
  onSelect,
  includeBack = false
}) {
  while (true) {
    const action = await selectWithNavigation(message, options, includeBack)

    if (action === ACTION_EXIT) {
      exitCli()
    }

    if (action === ACTION_BACK) {
      return
    }

    try {
      await onSelect(action)
    } catch (error) {
      cancel(formatError(error))
    }
  }
}
