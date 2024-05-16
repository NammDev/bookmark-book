import { redirect } from 'next/navigation'
import { messages } from '@/config/messages'
import { urls } from '@/config/urls'
import { Progress } from '@/components/ui/progress'

import {
  getBookmarkUsage,
  getFavoriteUsage,
  getShareUsage,
  getTagUsage,
  getUserPlan,
  isProPlan,
  isProPlanExpired,
} from '@/lib/data'
import {
  addYears,
  formatBillingDate,
  formatDate,
  getFirstAndLastDate,
  isWithinTwoMonths,
} from '@/lib/date'
import { cn } from '@/lib/utils'

import PlanTooltip from './plan-tooltip'
import PlanUpgradeButton from './plan-upgrade'
import SettingsCard from './settings-card'
import { getCachedAuthUser, getCachedUser, getUser } from '@/lib/actions/users'

export default async function Plans() {
  const authUser = await getCachedAuthUser()
  const user = await getUser(authUser?.id as string)
  if (!user) return redirect(urls.account)

  const isFreePlan = !isProPlan(user)
  const isPlanExpired = isProPlanExpired(user)
  const { bookmarks, favorites, tags, share } = getUserPlan(user).limit

  const bookmarkPercentage = getBookmarkUsage(user)
  const tagPercentage = getTagUsage(user)
  const favoritePercentage = getFavoriteUsage(user)
  const sharePercentage = getShareUsage(user)
  const { first, last } = getFirstAndLastDate(user.billingCycleStartDate.toISOString())
  const isWithInTwoMonths = isWithinTwoMonths(new Date(user.billingCycleStartDate))

  return (
    <SettingsCard className='flex flex-col items-start gap-0 p-0'>
      <div className='py-3 px-4 relative border-b w-full text-sm flex text-muted-foreground'>
        <div className={cn(`flex max-sm:flex-col max-sm:gap-1`)}>
          {!isPlanExpired ? (
            <div className='flex items-center'>
              Currently on
              <span className='mx-1 text-black dark:text-white font-medium'>{user.planStatus}</span>
              plan.
            </div>
          ) : null}
          {first && last && !isPlanExpired ? (
            <div>
              <span className='sm:ml-1 mt-1'>Current billing cycle:</span>
              <span className='ml-1 text-black dark:text-white font-medium'>
                {formatBillingDate(first)} - {formatBillingDate(last)}
              </span>
            </div>
          ) : null}
          <PlanTooltip
            type='info'
            className='absolute right-3 top-3.5'
            text={messages.usageLimitRenewal}
          />
        </div>
      </div>
      <div className='flex flex-col w-full'>
        <div className='p-4'>
          <h3 className='font-medium mb-2 text-sm flex items-center'>
            Bookmarks{' '}
            <PlanTooltip text='Number of bookmarks created on your current billing cycle.' />
          </h3>
          <div className='flex w-full justify-between'>
            <span className='mb-2 text-sm tabular-nums'>
              {user.usage.bookmarks}
              <span className='text-muted-foreground ml-1'>/ {bookmarks}</span>
              <span className='text-muted-foreground text-xs ml-1.5'>({bookmarkPercentage}%)</span>
            </span>
          </div>
          <Progress className='h-3 mt-1' value={bookmarkPercentage} />
        </div>
        <div className='flex flex-col md:flex-row justify-between mt-3 border-t'>
          <div className='w-full md:border-r max-sm:border-b p-4 pb-6'>
            <h3 className='font-medium mb-2 text-sm flex items-center'>
              Tags <PlanTooltip text='Number of tags created' />
            </h3>
            <div className='flex w-full justify-between'>
              <span className='flex items-center mb-2 text-sm tabular-nums'>
                {user.usage.tags}
                <span className='text-muted-foreground ml-1'>/ {tags}</span>
                <span className='text-muted-foreground text-xs ml-1.5'>({tagPercentage}%)</span>
              </span>
            </div>
            <Progress className='h-3 mt-1' value={tagPercentage} />
          </div>
          <div className='w-full p-4 pb-6 md:border-r max-sm:border-b'>
            <h3 className='font-medium mb-2 text-sm flex items-center'>
              Favorites <PlanTooltip text='Number of bookmarks marked as favorite' />
            </h3>
            <div className='flex w-full justify-between'>
              <span className='mb-2 text-sm tabular-nums'>
                {user.usage.favorites}
                <span className='text-muted-foreground ml-1'>/ {favorites}</span>
                <span className='text-muted-foreground  text-xs ml-1.5'>
                  ({favoritePercentage}%)
                </span>
              </span>
            </div>
            <Progress className='h-3 mt-1' value={favoritePercentage} />
          </div>
          <div className='w-full p-4 pb-6'>
            <h3 className='font-medium mb-2 text-sm flex items-center'>
              Sharing
              <PlanTooltip text='Number of times tags was shared publicly' />
            </h3>
            <div className='flex w-full justify-between'>
              <span className='mb-2 text-sm tabular-nums'>
                {user.shareCount}
                <span className='text-muted-foreground ml-1'>/ {share}</span>
                <span className='text-muted-foreground  text-xs ml-1.5'>({sharePercentage}%)</span>
              </span>
            </div>
            <Progress className='h-3 mt-1' value={sharePercentage} />
          </div>
        </div>
      </div>

      {isFreePlan || isPlanExpired ? (
        <div className='flex w-full p-3.5 justify-between items-center border-t'>
          <p className='text-muted-foreground text-sm text-balance'>
            For more usage limits, upgrade to the Pro plan.
          </p>
          <PlanUpgradeButton />
        </div>
      ) : !isPlanExpired ? (
        <div className='flex w-full p-3.5 justify-between items-center border-t'>
          <p className='text-muted-foreground text-sm'>
            Your {user.planStatus} plan will expire on{' '}
            <span
              className={cn(`text-primary font-medium`, {
                'text-red-600 dark:text-red-500': isWithInTwoMonths,
              })}
            >
              {formatDate(addYears(user.billingCycleStartDate, 1))}
            </span>
          </p>
        </div>
      ) : null}
    </SettingsCard>
  )
}
