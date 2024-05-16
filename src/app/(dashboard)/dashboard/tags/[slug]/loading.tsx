import DashboardHeader from '@/components/dashboard/dashboard-header'
import CardSkeleton from '@/components/skeleton/card-skeleton'

export default function Loading() {
  return (
    <>
      <DashboardHeader loading headerText={`Tag:`} />
      <div className='min-h-dvh sm:border-r border-border'>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className='border-b border-border' />
      </div>
    </>
  )
}
