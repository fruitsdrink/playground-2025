import { useState } from "react";
import { NoteForm, NoteList } from "./components";
import type { Note } from "./types";

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  return (
    <main className=" max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">📓 Notes App</h2>
      <NoteForm setNotes={setNotes} />
      <NoteList notes={notes} />
    </main>
  );
}
