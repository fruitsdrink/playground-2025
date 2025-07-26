import type React from "react";
import type { Note } from "../types";

type NoteListProps = {
    notes: Note[]
}
export const NoteList: React.FC<NoteListProps> = ({notes})=>{
    console.log('NoteList render ', Date.now())
    if(!notes.length){
        return <p className="text-center text-gray-500">No notes yet</p>
    }

    return (
        <div className="space-y-4">
            {
                notes.map(note => (
                    <div key={note.id} className="p-4 bg-white border-l-4 shadow rounded">
                        <h3 className="text-lg font-semibold">{note.title}</h3>
                        <p className="text-sm text-gray-600 capitalize">
                            <strong>Category: {note.category}</strong>
                        </p>
                        <p className="text-sm text-gray-600 capitalize">
                            <strong>Priority: {note.priority}</strong>
                        </p>
                        <p className="mt-2">{note.description}</p>
                    </div>
                ))
            }
        </div>
    )
}