import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { LuFilePen } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)

  const handleCreation = () => {
    createEmptyNote()
  }

  return (
    <ActionButton {...props} onClick={handleCreation}>
      <LuFilePen className="w-4 h-4 to-zinc-300" />
    </ActionButton>
  )
}
