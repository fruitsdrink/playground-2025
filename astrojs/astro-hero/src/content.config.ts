import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";
import { parse as parseCsv } from "csv-parse/sync";
import { parse as parseToml } from "toml";

const team = defineCollection({
  loader: file("src/data/team.json", {
    parser: (text) => JSON.parse(text)["team-1"],
  }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().email(),
    department: z.enum(["Engineering", "Design", "Product", "Support"]),
  }),
});

const posts = defineCollection({
  loader: glob({
    // pattern: "src/data/posts/*.md",
    pattern: ["*.md"],
    base: "src/data/posts",
    generateId: (opts) => {
      return opts.entry;
    },
  }),
  schema: z.object({
    title: z.string().min(1, "Title is required"),
  }),
});

const cats = defineCollection({
  loader: file("src/data/cats.csv", {
    parser: (text) => parseCsv(text, { columns: true, skipEmptyLines: true }),
  }),
});

const toml = defineCollection({
  loader: file("src/data/sample.toml", {
    parser: (text) => parseToml(text),
  }),
});

const todos = defineCollection({
  loader: async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");

    const data = await res.json();
    return data.map((todo: any) => ({
      ...todo,
      id: todo.id.toString(), // Ensure id is a string
    }));
  },
});
export const collections = {
  team,
  posts,
  cats,
  toml,
  todos,
};
