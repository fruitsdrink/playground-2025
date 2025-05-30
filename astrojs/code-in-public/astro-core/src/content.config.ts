import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import { parse as parseToml } from "toml";
import { parse as parseCsv } from "csv-parse/sync";

export const collections = {
  todos: defineCollection({
    loader: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const todos = await res.json();

      return todos.map((todo: any) => ({ ...todo, id: todo.id.toString() }));
    },
    schema: z.object({
      title: z.string(),
      completed: z.boolean(),
    }),
  }),
  posts: defineCollection({
    loader: glob({
      pattern: "**/*.{md,mdx}",
      base: "src/data/module4/posts",
      // generateId: ({ entry, data }) => data.title as unknown as string,
    }),
    schema: ({ image }) => {
      return z.object({
        title: z.string().max(32),
        tags: z.array(z.string()),
        pubDate: z.coerce.date(),
        isDraft: z.boolean(),
        canonicalURL: z.string().url().optional(),
        cover: image(),
        coverAlt: z.string(),
        author: reference("team"),
      });
    },
  }),
  team: defineCollection({
    loader: file("src/data/module4/team.json", {
      parser: (text) => JSON.parse(text)["team-1"],
    }),
    schema: z.object({
      name: z.string(),
      role: z.string(),
      email: z.string().email(),
      department: z.enum([
        "Engineering",
        "Software Development",
        "Product Design",
      ]),
      posts: z.array(reference("posts")),
    }),
  }),
  cats: defineCollection({
    loader: file("src/data/module4/cats.csv", {
      parser: (text) =>
        parseCsv(text, {
          columns: true,
          skip_empty_lines: true,
        }),
    }),
  }),
  toml: defineCollection({
    loader: file("src/data/module4/sample.toml", {
      parser: (text) => parseToml(text),
    }),
  }),
};
