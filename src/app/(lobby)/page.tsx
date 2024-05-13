import { tweetIds } from '@/config/tweetIds'

export default async function Page() {
  return (
    <>
      <div className='mx-auto max-sm:mt-32 mt-32'>
        <h2 className='lg:text-6xl md:text-5xl text-4xl text-primary font-black max-w-2xl text-center mx-auto tracking-tight py-4 pb-1'>
          Bookmark manager
          <br />
          for{' '}
          <span className='bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mt-1 inline-flex'>
            the modern web.
          </span>
        </h2>
        <p className='text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center'>
          Effortlessly Bookmark, Categorize, and Favorite your websites.
        </p>
        {/* <Signup /> */}
      </div>

      {/* <Features /> */}

      <div className='mx-auto w-full h-full relative my-8 mt-10 sm:mt-20  flex flex-col items-center'>
        <h2 className='mt-4 mb-0 text-3xl font-extrabold tracking-[-0.03em] text-center text-primary sm:text-4xl sm:leading-[3.5rem]'>
          <span className='bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mt-1 inline-flex'>
            What People
          </span>{' '}
          Are Saying
        </h2>
        <p className='mt-3 mb-0 text-muted-foreground leading-7 sm:text-lg w-[80%] text-center'>
          Don{"'"}t just take our word for it. Here{"'"}s what people are saying on Twitter.
        </p>
        <div className='flex overflow-hidden relative w-full'>
          <div className='animate-marquee gap-6 hover:animation-pause items-center w-full max-w-[90vw] flex'>
            {tweetIds.map((id) => (
              <div key={id} data-theme='light'>
                {/* <Tweet id={id} /> */}
              </div>
            ))}
          </div>
          <div className='pointer-events-none absolute inset-y-0 left-0 h-full w-1/5 bg-gradient-to-r from-white dark:from-background'></div>
          <div className='pointer-events-none absolute inset-y-0 right-0 h-full  w-1/5 bg-gradient-to-l from-white dark:from-background'></div>
        </div>
      </div>

      {/* <Extensions />
        <Pricing />
        <Faq /> */}

      <div className='mx-auto mt-0 sm:mt-16  flex flex-col items-center'>
        <h2 className='mt-4 text-3xl font-extrabold tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]'>
          Proudly{' '}
          <span className='bg-gradient-to-r from-blue-400 to-sky-600 bg-clip-text text-transparent'>
            Open Source
          </span>
        </h2>
        <p className='mt-3 mb-10 text-muted-foreground leading-7 sm:text-lg w-[80%] text-center'>
          Our source code is available on GitHub - feel free to read, review, or contribute to it.
        </p>
        {/* <GitButton /> */}
      </div>
    </>
  )
}
