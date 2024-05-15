import { plans } from '@/config/plans'
import { BookmarkModified, UserModified } from '@/types/data'
import { addYears } from './date'
// import groupBy from 'object.groupby'

// export const groupByDate = (data: BookmarkModified[]) => {
//   if (!data) return {}
//   return groupBy(data, ({ created_at }) => {
//     const date = new Date(created_at)
//     const dateStr = new Intl.DateTimeFormat('en-US').format(date).replace(/\//g, '-')
//     return dateStr
//   }) as { [key: string]: BookmarkModified[] }
// }

export const filterByTagName = (data: BookmarkModified[], tagName: string) => {
  if (!data) return []
  return data.filter((datum) => {
    return datum.bookmarksTags.some((bookmarkTag) => {
      return bookmarkTag.tags.name === tagName
    })
  })
}

export const getUserPlan = (userData: UserModified) => {
  return userData?.planStatus === plans.pro.type ? plans.pro : plans.free
}

export const isProPlan = (userData: UserModified) => {
  return userData?.planStatus === plans.pro.type && userData?.orderInfo?.status === 'paid'
}

export const isProPlanExpired = (userData: UserModified) => {
  const calcualtedRenewalDate = addYears(userData.billingCycleStartDate, 1)
  return isProPlan(userData) && calcualtedRenewalDate && new Date() >= calcualtedRenewalDate
}

export const checkBookmarkLimit = (userData: UserModified, bookmarks: BookmarkModified[]) => {
  const currentPlan = getUserPlan(userData)
  const isLimitReached =
    userData.usage.bookmarks >= currentPlan.limit.bookmarks ||
    bookmarks.length > Math.abs(currentPlan.limit.bookmarks - userData.usage.bookmarks)

  return isLimitReached
}

export const checkTagLimit = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData)
  return userData?.usage?.tags >= currentPlan.limit.tags
}

export const getBookmarkUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData)
  return Math.floor((userData.usage.bookmarks / currentPlan.limit.bookmarks) * 100)
}

export const getTagUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData)
  return Math.floor((userData.usage.tags / currentPlan.limit.tags) * 100)
}

export const getFavoriteUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData)
  return Math.floor((userData.usage.favorites / currentPlan.limit.favorites) * 100)
}

export const getShareUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData)
  return Math.floor((userData.shareCount / currentPlan.limit.share) * 100)
}
