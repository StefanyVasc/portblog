export function resolveSuffix(language?: string) {
  const normalized = language?.toLowerCase() ?? 'pt'
  return normalized.startsWith('en') ? '.en' : ''
}
