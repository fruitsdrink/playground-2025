import type { StrapiPost } from "~/features/blog/types";
import type { Route } from "./+types/details";

import Markdown from "react-markdown";
import { Link } from "react-router";
import type { StrapiResponse } from "~/types";

export async function loader({ request, params }: Route.LoaderArgs) {
  const { slug } = params;

  // const url = new URL("/posts-meta.json", request.url);
  // const res = await fetch(url);

  const res = await fetch(
    `${
      import.meta.env.VITE_API_URL
    }/posts?filters[slug][$eq]=${slug}&populate=image`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // const postMetaList = (await res.json()) as PostMeta[];
  const posts: StrapiResponse<StrapiPost[]> = await res.json();

  // const postMeta = postMetaList.find((post) => post.slug === slug);
  if (!posts.data.length) {
    throw new Response("Not Found", { status: 404 });
  }

  const item = posts.data[0];
  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };
  // const markdown = await import(`../../posts/${slug}.md?raw`);

  return {
    post,
  };
}

export default function BlogDetailsPage({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2 ">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toDateString()}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover mb-4"
        />
      )}

      <div className="prose prose-invert max-w-none mb-12">
        <Markdown>{post.body}</Markdown>
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
