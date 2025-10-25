import { HttpError } from '@/services/http/http'

export async function fetchText(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<string> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new HttpError(response)
  }

  return response.text()
}
