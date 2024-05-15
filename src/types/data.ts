import { User } from '@prisma/client'

export type MetaTags = {
  title: string
  description: string
  image: string
  is_fallback: boolean
}

export type UserModified = User & {
  usage: {
    tags: number
    bookmarks: number
    favorites: number
  }
  order_info: {
    identifier: string
    store_id: string
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
