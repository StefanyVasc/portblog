import type { ZodIssue } from 'zod'

export function formatIssues(issues: ZodIssue[]) {
  return issues
    .map(issue => {
      const path = issue.path.length ? issue.path.join('.') : 'root'
      return `${path}: ${issue.message}`
    })
    .join(', ')
}
