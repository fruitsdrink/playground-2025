import { saveNoteAtom, selectedNoteAtom } from '@/store'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { autoSaveTime } from '@shared/constants'
import { NoteContent } from '@shared/models'
import { useAtomValue, useSetAtom } from 'jotai'
import { throttle } from 'lodash'
import { useRef } from 'react'

export const useMarkdownEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editorRef = useRef<MDXEditorMethods>(null)

  const handleAutoSaving = throttle(
    async (content: NoteContent) => {
      if (!selectedNote) return
      await saveNote(content)
    },
    autoSaveTime,
    {
      leading: false,
      trailing: true
    }
  )

  const handleBlur = async () => {
    if (!selectedNote) return

    handleAutoSaving.cancel()

    const content = editorRef.current?.getMarkdown()
    if (content) {
      await saveNote(content)
    }
  }

  return { selectedNote, editorRef, handleAutoSaving, handleBlur }
}
