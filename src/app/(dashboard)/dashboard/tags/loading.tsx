import DashboardHeader from '@/components/dashboard/dashboard-header'
import CardSkeleton from '@/components/skeleton/card-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <DashboardHeader headerText='Tags' />
      <div className='flex gap-x-3 gap-y-2 items-end px-4 sm:border-r flex-wrap py-3'>
        <Skeleton className='w-20 h-7 bg-accent rounded-full' />
        <Skeleton className='w-20 h-7 bg-accent rounded-full' />
        <Skeleton className='w-20 h-7 bg-accent rounded-full' />
        <Skeleton className='w-20 h-7 bg-accent rounded-full' />
      </div>
      <div className='border-b border-border flex w-full' />
      <div className='min-h-dvh sm:border-r border-border'>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className='border-b border-border' />
      </div>
    </>
  )
}
