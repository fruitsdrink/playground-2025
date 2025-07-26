import type React from "react";
import type { Note } from "../types";
import { NoteItem } from "./note-item";

type NoteListProps = {
  notes: Note[];
  deleteNote: (id: string) => void;
};
export const NoteList: React.FC<NoteListProps> = ({ notes, deleteNote }) => {
  console.log("NoteList render ", Date.now());
  if (!notes.length) {
    return <p className="text-center text-gray-500">No notes yet</p>;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem note={note} deleteNote={deleteNote} key={note.id} />
      ))}
    </div>
  );
};
