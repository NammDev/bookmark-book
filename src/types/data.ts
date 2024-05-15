import { Bookmark, User } from '@prisma/client'

export type BookmarkModified = Bookmark & {
  metadata: {
    image: string
    isFallback?: boolean
    isViaExtension?: boolean
  }
  bookmarksTags: { tags: { id: string; name: string } }[]
}
// export type BookmarkInsertModified = BookmarkInsert & {
//   user_id?: string
//   metadata: {
//     image: string
//   }
// }

export type MetaTags = {
  title: string
  description: string
  image: string
  isFallback: boolean
}

export type UserModified = User & {
  usage: {
    tags: number
    bookmarks: number
    favorites: number
  }
  orderInfo: {
    identifier: string
    storeId: string
    number: string
    status: string
  }
}

export type PlanDetailsType = {
  type: string
  name: string
  limit: {
    bookmarks: number
    tags: number
    favorites: number
    sessions: number
    imports: number
    share: number
  }
  pricing: {
    monthly: number
    yearly: number
  }
}

export type PlansType = {
  free: PlanDetailsType
  pro: PlanDetailsType
}

export type PaymentType = 'monthly' | 'yearly'
