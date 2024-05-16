import { z } from 'zod'

const BookmarkInsertSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().nullable().optional(),
  metadata: z.unknown().optional(),
  isFav: z.boolean().optional(),
  previewImage: z.boolean().optional(),
  userId: z.string(),
})

export type BookmarkInsertSchemaType = z.infer<typeof BookmarkInsertSchema>

const BookmarkRefreshSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  metadata: z.unknown().optional(),
  previewImage: z.boolean().optional(),
})

export type BookmarkRefreshSchemaType = z.infer<typeof BookmarkRefreshSchema>
