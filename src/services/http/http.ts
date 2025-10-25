import { type ZodIssue } from 'zod'

export class HttpError extends Error {
  status: number
  statusText: string
  url?: string

  constructor(response: Response, message?: string) {
    const resolvedMessage =
      message ?? `Request failed with status ${response.status}`
    super(resolvedMessage)
    this.name = 'HttpError'
    this.status = response.status
    this.statusText = response.statusText
    this.url = response.url
  }
}

export class ValidationError extends Error {
  issues: ZodIssue[]

  constructor(issues: ZodIssue[], message: string) {
    super(message)
    this.name = 'ValidationError'
    this.issues = issues
  }
}
