import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection, reference } from "astro:content";
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
    todos: z.array(reference("todos")),
    department: z.enum(["Engineering", "Design", "Product", "Support"]),
  }),
});

const posts = defineCollection({
  loader: glob({
    // pattern: "src/data/posts/*.md",
    pattern: ["*.md"],
    base: "src/data/posts",
    generateId: ({ entry }) => {
      return entry.replace(/\.md$/, "");
      // return data["slug"] as string;
    },
  }),
  schema: ({ image }) => {
    return z.object({
      title: z.string(),
      tags: z.array(z.string()),
      pubDate: z.coerce.date(),
      isDraft: z.boolean(),
      canonicalURL: z.string().url().optional(),
      cover: image(),
      coverAlt: z.string(),
      author: reference("team"),
      slug: z.string().min(1),
    });
  },
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
  schema: z
    .object({
      title: z.string(),
      completed: z.boolean(),
    })
    .transform((data) => ({
      taskName: data.title,
      isCompleted: data.completed,
    })),
});
export const collections = {
  team,
  posts,
  cats,
  toml,
  todos,
};
