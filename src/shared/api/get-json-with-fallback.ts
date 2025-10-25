export async function fetchJsonWithFallback<T>(
  primaryPath: string,
  fallbackPath: string
): Promise<T> {
  const primaryResponse = await fetch(primaryPath)

  if (primaryResponse.ok) {
    return primaryResponse.json() as Promise<T>
  }

  if (primaryResponse.status === 404 && primaryPath !== fallbackPath) {
    const fallbackResponse = await fetch(fallbackPath)
    if (fallbackResponse.ok) {
      return fallbackResponse.json() as Promise<T>
    }
  }

  throw new Error(`Não foi possível carregar ${primaryPath}`)
}
