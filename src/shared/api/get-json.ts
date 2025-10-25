import { HttpError } from '@/services/http/http'

export async function getJson(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<unknown> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new HttpError(response)
  }

  return response.json()
}
