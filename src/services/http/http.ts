import { type ZodIssue } from 'zod'

type HttpErrorInit = {
  status: number
  statusText: string
  url?: string
}

export class HttpError extends Error {
  status: number
  statusText: string
  url?: string

  constructor(response: Response | HttpErrorInit, message?: string) {
    const isFetchResponse = response instanceof Response
    const status = isFetchResponse ? response.status : response.status
    const statusText = isFetchResponse
      ? response.statusText
      : response.statusText
    const url = isFetchResponse ? response.url : response.url

    const resolvedMessage = message ?? `Request failed with status ${status}`
    super(resolvedMessage)
    this.name = 'HttpError'
    this.status = status
    this.statusText = statusText
    this.url = url
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
