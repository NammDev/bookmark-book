'use server'

import { revalidateTag } from 'next/cache'
import { formatDate } from '@/lib/date'
import { getCachedAuthUser } from './users'
import { db } from '../db'
import { Bookmark, Tag } from '@prisma/client'
import { TagInsertType } from '../validations/tag'

const dateOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
} as Intl.DateTimeFormatOptions

export const getTags = async () => {
  const user = await getCachedAuthUser()
  if (!user) return []

  const tags = await db.tag.findMany({
    where: {
      userId: user.id,
    },
    select: {
      userId: true,
      id: true,
      name: true,
      shared: true,
      sharedHash: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      name: 'asc',
    },
  })

  return tags
}

export const createTag = async (id: Bookmark['id'], tag: TagInsertType) => {
  const user = await getCachedAuthUser()
  if (!user) return []
  try {
    const newTag = await db.tag.create({
      data: {
        ...tag,
        userId: user.id,
      },
    })
    await createBookmarkTag(id, newTag.id)
    revalidateTag('tags')
  } catch (error) {
    return new Error('Unable to create a tag.')
  }
}

export const createBookmarkTag = async (bookmarkId: Bookmark['id'], tagId: Tag['id']) => {
  try {
    await db.bookmarkTag.create({
      data: {
        bookmarkId,
        tagId,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const addTagToBookmark = async (
  id: Bookmark['id'],
  tagId: Tag['id'],
  isChecked: boolean
) => {
  const user = await getCachedAuthUser()
  if (!user) return []

  if (!isChecked) {
    await createBookmarkTag(id, tagId)

    // await supabase
    //   .from('tags')
    //   .update({
    //     updated_at: new Date().toISOString(),
    //   })
    //   .eq('id', tagId)
  } else {
    await db.bookmarkTag.delete({
      where: {
        bookmarkId_tagId: {
          bookmarkId: id,
          tagId: tagId,
        },
      },
    })
  }
  revalidateTag('supabase')
}

// export const deleteTag = async (tagId: Tag['id']) => {
//   const user = await getAuthUser()
//   if (!user) {
//     return new Error('User is not authenticated.')
//   }

//   const supabase = await createClient()

//   const { error: bookmarkError } = await supabase
//     .from('bookmarks_tags')
//     .delete()
//     .eq('tag_id', tagId)
//     .eq('user_id', user.id)

//   if (bookmarkError) {
//     return new Error('Unable to delete tag from bookmarks.')
//   }

//   const { error } = await supabase.from('tags').delete().eq('id', tagId).eq('user_id', user.id)

//   if (error) {
//     return new Error('Unable to delete the tag.')
//   }

//   revalidateTag('supabase')
// }

// export const updateTag = async (id: Bookmark['id'], name: Tag['name']) => {
//   const user = await getAuthUser()
//   if (!user) {
//     return new Error('User is not authenticated.')
//   }

//   const supabase = await createClient()
//   const { error } = await supabase
//     .from('tags')
//     .update({ name } as TagInsert)
//     .eq('id', id)
//     .eq('user_id', user.id)

//   if (error) {
//     return new Error('Unable to update bookmark.')
//   }
//   revalidateTag('supabase')
// }

// export const getTagsWithBookmarkIds = async () => {
//   const user = await getAuthUser()
//   if (!user) {
//     return {}
//   }

//   const supabase = await createClient()
//   const { data, error } = await supabase.from('bookmarks_tags').select().eq('user_id', user.id)

//   if (error) {
//     return {}
//   }

//   return data.reduce((acc: { [key: string]: number[] }, datum) => {
//     if (!acc[datum.tag_id]) {
//       acc[datum.tag_id] = [datum.bookmark_id]
//     } else {
//       acc[datum.tag_id].push(datum.bookmark_id)
//     }
//     return acc
//   }, {})
// }

// export const createTagForImport = async (uploadCount: number) => {
//   const user = await getAuthUser()
//   if (!user) {
//     return null
//   }

//   const supabase = await createClient()
//   const { data, error } = await supabase
//     .from('tags')
//     .insert({
//       name: `imported-on-${formatDate(new Date(), dateOptions)?.replaceAll(
//         '/',
//         '-'
//       )}-${uploadCount}`,
//       user_id: user.id,
//     } as TagInsert)
//     .select()
//     .single()

//   if (error) {
//     return null
//   }

//   return data
// }
