import type { PostMeta } from "~/features/blog/types";
import type { Route } from "./+types";
import { Link } from "react-router";
import { PostCard } from "~/features/blog/components/PostCard";
import { useState } from "react";
import { Pagination } from "~/components/Pagination";
import { PostFilter } from "~/features/blog/components/PostFilter";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);

  const res = await fetch(url.href);
  if (!res.ok) throw new Error("Failed to fetch posts");

  let posts = await res.json();

  posts = posts.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { posts };
}
export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  let { posts } = loaderData;
  posts = posts.filter((post) => {
    const keyword = searchQuery.toLowerCase();

    return (
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword)
    );
  });

  const totalPage = Math.ceil(posts.length / postsPerPage);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  posts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
      <h2 className="text-3xl font-bold text-white mb-8">🚀 Blog</h2>
      <PostFilter
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
      />

      <div className="space-y-8">
        {posts.length === 0 ? (
          <div className="text-center text-gray-400">No posts found</div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
