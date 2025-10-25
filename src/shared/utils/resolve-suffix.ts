export function resolveSuffix(language?: string) {
  const normalized = language?.toLowerCase() ?? 'pt'
  if (normalized.startsWith('en')) return '.en'
  if (normalized.startsWith('pt')) return '.pt'
  return ''
}
