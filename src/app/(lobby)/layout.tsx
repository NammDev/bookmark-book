import Footer from '@/components/home/footer'
import Header from '@/components/home/header'

export default async function LobbyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-col mx-auto w-full homepage'>
      <main className='flex after:bg-grid sm:max-w-4xl py-5 mx-auto flex-col w-full h-fit px-4'>
        <Header />
        {children}
      </main>

      <Footer />
    </div>
  )
}
