'use server'

import { revalidateTag } from 'next/cache'
import {
  BookmarkInsertSchemaType,
  BookmarkRefreshSchemaType,
  BookmarkUpdateSchemaType,
} from '../validations/bookmark'
import { db } from '../db'
import { getCachedAuthUser, getCachedUser, incrementFavUsage } from './users'
import { Bookmark } from '@prisma/client'

export const createBookmark = async (bookmark: BookmarkInsertSchemaType) => {
  try {
    const newBookmark = await db.bookmark.create({
      data: {
        ...bookmark,
        //@ts-ignore
        metadata: bookmark.metadata,
      },
    })
    revalidateTag(`bookmark`)
    return newBookmark
  } catch (error) {
    return new Error('Unable to create a new bookmark.')
  }
}

export const getBookmarks = async () => {
  const user = await getCachedUser()
  if (!user) return []

  return await db.bookmark.findMany({
    where: {
      userId: user.id,
    },
    include: {
      BookmarkTag: {
        select: {
          Tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const getFavBookmarks = async () => {
  const user = await getCachedUser()
  if (!user) return []

  return await db.bookmark.findMany({
    where: {
      userId: user.id,
      isFav: true,
    },
    include: {
      BookmarkTag: {
        select: {
          Tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export const addToFav = async (id: Bookmark['id'], isFav: Bookmark['isFav']) => {
  const user = await getCachedUser()
  if (!user) return new Error('User is not authenticated.')

  try {
    if (isFav) {
      await incrementFavUsage()
    } else {
      await incrementFavUsage(-1)
    }

    const newBookmark = await db.bookmark.update({
      where: {
        id: id,
        userId: user.id,
      },
      data: {
        isFav: isFav,
      },
    })

    revalidateTag(`bookmark`)
    return newBookmark
  } catch (error) {
    return new Error('Unable to add to fav.')
  }
}

export const getBookmarksForTag = async (slug: string) => {
  const user = await getCachedAuthUser()
  if (!user) return []

  return await db.bookmark.findMany({
    where: {
      userId: user.id,
      BookmarkTag: {
        some: {
          Tag: {
            name: slug,
          },
        },
      },
    },
    include: {
      BookmarkTag: {
        select: {
          Tag: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export const updateBookmark = async (id: Bookmark['id'], bookmark: BookmarkUpdateSchemaType) => {
  const user = await getCachedAuthUser()
  if (!user) return []

  try {
    const newBookmark = await db.bookmark.update({
      where: { id, userId: user.id },
      data: {
        ...bookmark,
        //@ts-ignore
        metadata: bookmark.metadata,
      },
    })
    revalidateTag(`bookmark`)
    return newBookmark
  } catch (error) {
    return new Error('Unable to update bookmark.')
  }
}

export const deleteBookmark = async (id: Bookmark['id']) => {
  const user = await getCachedAuthUser()
  if (!user) return new Error('User is not authenticated.')

  const bookmarkTag = await db.bookmarkTag.deleteMany({
    where: {
      bookmarkId: id,
    },
  })

  const bookmarkDelete = await db.bookmark.delete({
    where: {
      id: id,
      userId: user.id,
    },
  })

  if (!bookmarkDelete || !bookmarkTag) {
    return new Error('Unable to delete the bookmark.')
  }

  revalidateTag('bookmark')
}

export const refreshBookmark = async (id: Bookmark['id'], bookmark: BookmarkRefreshSchemaType) => {
  const user = await getCachedAuthUser()
  if (!user) return new Error('User is not authenticated.')

  try {
    const newBookmark = await db.bookmark.update({
      where: { id, userId: user.id },
      data: {
        ...bookmark,
        //@ts-ignore
        metadata: bookmark.metadata,
      },
    })
    revalidateTag(`bookmark`)
    return newBookmark
  } catch (error) {
    return new Error('Unable to create a new bookmark.')
  }
}

// export const getBookmarksAsCSV = async () => {
//   const user = await getAuthUser()
//   if (!user) {
//     return ''
//   }

//   const supabase = await createClient()
//   const { data, error } = await supabase
//     .from('bookmarks')
//     .select(
//       `title, url, description, is_fav, bookmarks_tags (tags!inner (name)), created_at, updated_at`
//     )
//     .eq('user_id', user.id)
//     .order('created_at', { ascending: false })
//     .returns<string>()
//     .csv()

//   if (error) {
//     return ''
//   }

//   return data
// }
