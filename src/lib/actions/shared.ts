'use server'

import { revalidateTag } from 'next/cache'
import { nanoid } from '@/lib/share'
import { Tag } from '@prisma/client'
import { db } from '../db'
import { getCachedAuthUser, incrementShareCount } from './users'
import { TagInsertType } from '../validations/tag'
import { getBookmarksForTag } from './bookmarks'

export const getSharedTag = async (hash: string) => {
  const tagDataResult = await db.tag.findFirst({
    where: { sharedHash: hash, shared: true },
  })
  if (!tagDataResult) throw new Error('Failed to fetch data')

  return tagDataResult
}

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
