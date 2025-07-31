import type { PostMeta } from "~/features/blog/types";
import type { Route } from "./+types/details";

import Markdown from "react-markdown";
import { Link } from "react-router";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const postMetaList = (await res.json()) as PostMeta[];

  const postMeta = postMetaList.find((post) => post.slug === slug);
  if (!postMeta) {
    throw new Response("Not Found", { status: 404 });
  }

  const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    postMeta,
    markdown: markdown.default,
  };
}

export default function BlogDetailsPage({ loaderData }: Route.ComponentProps) {
  const { postMeta, markdown } = loaderData;

  console.log({
    postMeta,
    markdown,
  });
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2 ">
        {postMeta.title}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(postMeta.date).toDateString()}
      </p>

      <div className="prose prose-invert max-w-none mb-12">
        <Markdown>{markdown}</Markdown>
      </div>

      <Link
        to={"/blog"}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ← Back To Blog{" "}
      </Link>
    </div>
  );
}
