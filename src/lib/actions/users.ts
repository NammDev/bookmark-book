'use server'

import { cache } from 'react'
import { unstable_noStore as noStore, revalidateTag } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { db } from '../db'
import { getUserEmail } from '../utils'
import { User } from '@prisma/client'

export const getCachedUser = cache(async () => {
  noStore()
  try {
    const user = await currentUser()
    if (!user) {
      return null
    }
    return db.user.findUnique({
      where: { id: user.id },
    })
  } catch {
    return null
  }
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
  return db.user.findUnique({
    where: {
      id: userId,
    },
  })
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
