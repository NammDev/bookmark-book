'use server'

import { cache } from 'react'
import { unstable_noStore as noStore, revalidateTag } from 'next/cache'
import { User as AuthUser, currentUser } from '@clerk/nextjs/server'
import { db } from '../db'
import { getUserEmail } from '../utils'
import { UserModified } from '@/types/data'
import { NextResponse } from 'next/server'

export const getCachedUser = cache(async () => {
  noStore()
  const user = await currentUser()
  if (!user) {
    return null
  }
  return db.user.findUnique({
    where: { id: user.id },
  })
})

export const getCachedAuthUser = cache(async () => {
  noStore()
  try {
    return await currentUser()
  } catch (err) {
    console.error(err)
    return null
  }
})

export async function getUser(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  })
  return user as UserModified | null
}

export async function createUser() {
  const userAuth = await getCachedAuthUser()
  return db.user.create({
    data: {
      id: userAuth?.id as string,
      email: getUserEmail(userAuth),
      avatarUrl: userAuth?.imageUrl,
      firstName: userAuth?.firstName,
      lastName: userAuth?.lastName,
      fullName: userAuth?.fullName,
    },
  })
}

export const checkAuth = async (
  callback: (authUser: AuthUser, user: UserModified) => Promise<Response | undefined>
) => {
  const authUser = await currentUser()
  const user = await getUser(authUser?.id as string)

  if (!authUser || !user) {
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 401 })
  }

  if (authUser) {
    return callback(authUser, user)
  }
}

export const setWelcomePageAsVisited = async () => {
  const userAuth = await getCachedAuthUser()
  try {
    await db.user.update({
      where: { id: userAuth?.id as string },
      data: { hasWelcomed: true },
    })
  } catch {
    throw new Error("User hasn't been welcomed")
  }
}

export const incrementBookmarkUsage = async (count: number = 1) => {
  const user = await getCachedUser()
  if (!user) return new Error('Unable to increment usage.')

  const usage = JSON.parse(JSON.stringify(user.usage))

  return await db.user.update({
    where: { id: user.id },
    data: {
      usage: {
        ...usage,
        bookmarks: usage.bookmarks + count,
      },
    },
  })
}

export const incrementFavUsage = async (count: number = 1) => {
  const user = await getCachedUser()
  if (!user) return new Error('Unable to increment usage.')

  const usage = JSON.parse(JSON.stringify(user.usage))

  return await db.user.update({
    where: { id: user.id },
    data: {
      usage: {
        ...usage,
        favorites: usage.favorites + count,
      },
    },
  })
}

export const incrementTagUsage = async (count: number = 1) => {
  const user = await getCachedUser()
  if (!user) return new Error('Unable to increment usage.')

  const usage = JSON.parse(JSON.stringify(user.usage))

  return await db.user.update({
    where: { id: user.id },
    data: {
      usage: {
        ...usage,
        tags: usage.tags + count,
      },
    },
  })
}

export const incrementShareCount = async (count: number = 1) => {
  const user = await getCachedUser()
  if (!user) return new Error('Unable to increment usage.')

  const shareCount = user.shareCount

  return await db.user.update({
    where: { id: user.id },
    data: {
      shareCount: shareCount + count,
    },
  })
}
