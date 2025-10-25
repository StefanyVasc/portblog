import { z } from 'zod'

import { ValidationError } from '@/services/http/http'
import { formatIssues } from '@/shared/utils/format-issues'

export function parseWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown,
  context?: string
): z.infer<TSchema> {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    const issues = parsed.error.issues
    const contextPrefix = context ? `${context}: ` : ''
    throw new ValidationError(issues, `${contextPrefix}${formatIssues(issues)}`)
  }

  return parsed.data
}
