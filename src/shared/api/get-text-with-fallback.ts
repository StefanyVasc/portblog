export async function fetchTextWithFallback(
  primaryPath: string,
  fallbackPath: string,
  init?: RequestInit
): Promise<string> {
  const primaryResponse = await fetch(primaryPath, init)

  if (primaryResponse.ok) {
    return primaryResponse.text()
  }

  if (primaryResponse.status === 404 && primaryPath !== fallbackPath) {
    const fallbackResponse = await fetch(fallbackPath, init)
    if (fallbackResponse.ok) {
      return fallbackResponse.text()
    }
  }

  throw new Error(`Não foi possível carregar ${primaryPath}`)
}
