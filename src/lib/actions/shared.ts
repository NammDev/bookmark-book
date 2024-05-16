'use server'

import { revalidateTag } from 'next/cache'
import { notFound } from 'next/navigation'
import { urls } from '@/config/urls'
import { nanoid } from '@/lib/share'
import { Tag } from '@prisma/client'
import { db } from '../db'
import { getCachedAuthUser, incrementShareCount } from './users'
import { TagInsertType } from '../validations/tag'

// export const getSharedBookmarks = async (hash: string) => {
//   const data = await fetch(`${urls.nonAppApi}/shared/bookmarks?hash=${encodeURIComponent(hash)}`, {
//     cache: 'no-cache',
//   })
//   if (data.status === 429) {
//     throw new Error('ratelimitexceeded')
//   }
//   if (data.status === 404) {
//     notFound()
//   }
//   if (!data.ok) {
//     return [] as BookmarkModified[]
//   }
//   return (await data.json()) as BookmarkModified[]
// }

export async function updateSharedTag(tag: Tag, shared: boolean) {
  const user = await getCachedAuthUser()
  if (!user) return null

  const hash = nanoid()

  const updatedTag = (await db.tag.update({
    where: { id: tag.id },
    data: { shared, sharedHash: shared ? `${tag.name}-${hash}` : null },
    select: {
      shared: true,
      sharedHash: true,
    },
  })) as TagInsertType

  if (!updatedTag) {
    throw new Error('updatedTag failed.')
  }

  if (!shared) {
    await incrementShareCount()
  } else {
    await incrementShareCount(-1)
  }

  revalidateTag('tags')
  return updatedTag
}
