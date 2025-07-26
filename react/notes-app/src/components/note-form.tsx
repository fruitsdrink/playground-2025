import { useState } from "react";
import style from "./note-form.module.css";
import type { Note } from "../types";

type NoteFormPorps = {
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};
export function NoteForm({ setNotes }: NoteFormPorps) {
  console.log("NoteForm render ", Date.now());
  const defaultData = {
    title: "",
    priority: "medium",
    category: "work",
    description: "",
  } as const;

  const [formData, setFormData] = useState<Omit<Note, "id">>(defaultData);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description)
      return alert("Please fill all the fields");

    const newNote: Note = {
      id: crypto.randomUUID(),
      ...formData,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setFormData(defaultData);
  };

  return (
    <>
      <button
        onClick={() => setIsFormVisible((prev) => !prev)}
        className="w-full bg-gray-100 border border-gray-300 py-2 rounded-md text-purple-800 cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition duration-200 mb-4"
      >
        {isFormVisible ? "Hide Form" : "Add New Note"}
      </button>
      {isFormVisible && (
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className={style.formItem}>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className={style.formItem}>
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
          <div className={style.formItem}>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="work">🗃️ Work</option>
              <option value="personal">🏠 Personal</option>
              <option value="ideas">💡 Ideas</option>
            </select>
          </div>
          <div className={style.formItem}>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className={style.button}>
            Add Note
          </button>
        </form>
      )}
    </>
  );
}
