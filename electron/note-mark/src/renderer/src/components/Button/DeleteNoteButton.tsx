import { ActionButton, ActionButtonProps } from '@/components'
import { deleteNoteAtom } from '@/store'
import { useSetAtom } from 'jotai'
import { FaRegTrashAlt } from 'react-icons/fa'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const handleDelete = () => {
    deleteNote()
  }

  return (
    <ActionButton {...props} onClick={handleDelete}>
      <FaRegTrashAlt className="w-4 h-4 to-zinc-300" />
    </ActionButton>
  )
}
