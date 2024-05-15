import { Dialog, DialogContent } from '@/components/ui/dialog'
import AddBookmarkInput from '../bookmark/add-input'
import { getCachedUser } from '@/lib/actions/users'

type AddBookmarkProps = {
  open: boolean
  onHide: (open: boolean) => void
}

export default function AddBookmark({ open, onHide }: AddBookmarkProps) {
  return (
    <Dialog open={open} onOpenChange={() => onHide(false)}>
      <DialogContent className='sm:max-w-md py-2 pb-0 px-2 !top-[30%] max-w-[calc(100%-6px)]'>
        <AddBookmarkInput
          onHide={() => {
            onHide(false)
          }}
          isInModal
          className='!border-none px-1'
          btnClassname='relative top-2.5'
        />
      </DialogContent>
    </Dialog>
  )
}
