'use client'

import UploadForm from '@/components/upload-form'

export default function UploadBookmarks() {
  return (
    <div className='flex mt-10 flex-col items-center justify-center max-w-md w-full'>
      <UploadForm
        SubmitBtn={({ children, disabled }: { children: React.ReactNode; disabled: boolean }) => (
          <button
            disabled={disabled}
            type='submit'
            className='items-center disabled:text-primary/50 mt-10 tracking-wide disabled:cursor-not-allowed disabled:bg-accent disabled:border-border rounded-full text-primary border border-border focus:outline-0 active:bg-accent text-sm flex justify-center py-2.5 px-5 transition-colors bg-primary-foreground hover:bg-accent'
          >
            {children}
          </button>
        )}
      />
    </div>
  )
}
