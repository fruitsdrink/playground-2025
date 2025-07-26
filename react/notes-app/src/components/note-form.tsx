import { useState } from "react";
import style from "./note-form.module.css";
import type { Note } from "../types";
import { SelectInput, TextAreaInput, TextInput } from "./inputs";

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
        className="w-full py-2 mb-4 text-purple-800 transition duration-200 bg-gray-100 border border-gray-300 rounded-md cursor-pointer hover:bg-purple-200 hover:border-purple-300"
      >
        {isFormVisible ? "Hide Form" : "Add New Note"}
      </button>
      {isFormVisible && (
        <form className="mb-6" onSubmit={handleSubmit}>
          <TextInput
            label="Title"
            name="title"
            className={style.formItem}
            value={formData.title}
            onChange={handleChange}
          />
          <SelectInput
            label="Priority"
            name="priority"
            value={formData.priority}
            className={style.formItem}
            onChange={handleChange}
            options={[
              { value: "low", label: "🟢 Low" },
              { value: "medium", label: "🟡 Medium" },
              { value: "high", label: "🔴 High" },
            ]}
          />
          <SelectInput
            label="Category"
            name="category"
            value={formData.category}
            className={style.formItem}
            onChange={handleChange}
            options={[
              { value: "work", label: "🗃️ Work" },
              { value: "personal", label: "🏠 Personal" },
              { value: "ideas", label: "💡 Ideas" },
            ]}
          />
          <TextAreaInput
            label="Description"
            name="description"
            value={formData.description}
            className={style.formItem}
            onChange={handleChange}
          />

          <button type="submit" className={style.button}>
            Add Note
          </button>
        </form>
      )}
    </>
  );
}
