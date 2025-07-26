import type { Note } from "../types";

type NoteItemProps = {
  note: Note;
  deleteNote: (id: string) => void;
};
export function NoteItem({ note, deleteNote }: NoteItemProps) {
  return (
    <div
      className="p-4 bg-white border-l-4 rounded shadow"
      style={{
        borderLeftColor:
          note.priority === "high"
            ? "red"
            : note.priority === "medium"
            ? "orange"
            : "green",
      }}
    >
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="text-sm text-gray-600 capitalize">
        <strong>Category: {note.category}</strong>
      </p>
      <p className="text-sm text-gray-600 capitalize">
        <strong>Priority: {note.priority}</strong>
      </p>
      <p className="mt-2">{note.description}</p>

      <button
        onClick={() => deleteNote(note.id)}
        className="mt-3 text-red-500 transition cursor-pointer hover:text-red-700"
      >
        🗑️ Delete
      </button>
    </div>
  );
}
