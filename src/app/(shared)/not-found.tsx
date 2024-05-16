export default async function NotFound() {
  return (
    <div className='max-w-[600px] m-auto flex min-h-dvh w-full'>
      <div className='flex justify-center items-center flex-col text-center w-full'>
        <h2 className='text-5xl font-bold'>404</h2>
        <p className='mt-2 text-lg text-muted-foreground'>Could not find requested resource.</p>
      </div>
    </div>
  )
}
