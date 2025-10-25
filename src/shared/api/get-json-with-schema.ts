import { z } from 'zod'

import { getJson } from '@/shared/api/get-json'
import { parseWithSchema } from '@/shared/utils/parse-with-schema'

export async function getJsonWithSchema<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  input: RequestInfo | URL,
  init?: RequestInit,
  context?: string
): Promise<z.infer<TSchema>> {
  const data = await getJson(input, init)
  return parseWithSchema(schema, data, context)
}
