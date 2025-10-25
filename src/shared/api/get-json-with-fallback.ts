export async function fetchJsonWithFallback<T>(
  primaryPath: string,
  fallbackPath: string,
  init?: RequestInit
): Promise<T> {
  const primaryResponse = await fetch(primaryPath, init)

  if (primaryResponse.ok) {
    return primaryResponse.json() as Promise<T>
  }

  if (primaryResponse.status === 404 && primaryPath !== fallbackPath) {
    const fallbackResponse = await fetch(fallbackPath, init)
    if (fallbackResponse.ok) {
      return fallbackResponse.json() as Promise<T>
    }
  }

  throw new Error(`Não foi possível carregar ${primaryPath}`)
}
