import { useEffect, useState } from "react";
import { NoteForm, NoteList } from "./components";
import type { Note } from "./types";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notes = localStorage.getItem("notes");
    return notes ? JSON.parse(notes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleDeleteNote = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <main className="max-w-lg p-6 mx-auto mt-10 bg-gray-100 rounded-md shadow-lg ">
      <h2 className="mb-4 text-2xl font-semibold text-center">📓 Notes App</h2>
      <NoteForm setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={handleDeleteNote} />
    </main>
  );
}
