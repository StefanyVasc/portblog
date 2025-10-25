import { HttpError } from '@/services/http/http'

export function isNotFoundError(error: unknown): error is HttpError {
  return error instanceof HttpError && error.status === 404
}
