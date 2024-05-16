import Sidebar from './sidebar'

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='max-w-2xl m-auto flex min-h-dvh w-full'>
      <Sidebar />
      <main className='flex sm:ml-[69px] max-sm:pb-[69px] flex-col w-full min-h-[100vh]'>
        {children}
      </main>
    </div>
  )
}
