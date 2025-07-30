import type { Post } from "~/features/blog/types";
import type { Route } from "./+types";
import { Link } from "react-router";
import { PostCard } from "~/features/blog/components/PostCard";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const url = new URL("/posts-meta.json", request.url);

  const res = await fetch(url.href);
  if (!res.ok) throw new Error("Failed to fetch posts");

  const posts = await res.json();

  return { posts };
}
export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8">🚀 Blog</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
