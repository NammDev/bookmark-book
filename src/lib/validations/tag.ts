import { z } from 'zod'

const TagInsertSchema = z.object({
  userId: z.string(),
  name: z.string(),
  shared: z.boolean().default(false),
  sharedHash: z.string().optional(),
})

export type TagInsertType = z.infer<typeof TagInsertSchema>
