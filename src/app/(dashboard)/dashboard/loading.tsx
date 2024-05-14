import DashboardHeader from '@/components/dashboard/dashboard-header'
import CardSkeleton from '@/components/skeleton/card-skeleton'
// import AddBookmarkInput from 'components/bookmark/add-input'

export default function Loading() {
  return (
    <>
      <DashboardHeader />
      {/* <AddBookmarkInput className='px-3' btnClassname='relative top-3' /> */}
      <div className='min-h-dvh sm:border-r border-border'>
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className='border-b border-border' />
      </div>
    </>
  )
}
