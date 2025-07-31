import { Link } from "react-router";
import type { PostMeta } from "../../blog/types";

type LatestPostsProp = {
  posts: PostMeta[];
  limit?: number;
};
export function LatestPosts({ posts, limit = 3 }: LatestPostsProp) {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const latestPosts = sortedPosts.slice(0, limit);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold mb-6 text-white">🆕 Latest Posts</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="block p-4 border border-gray-700 rounded-lg bg-gray-800 hover:shadow-md transition-opacity"
          >
            <h3 className="text-lg font-semibold text-blue-400 mb-1">
              {post.title}
            </h3>
            <p className="text-sm text-gray-300">{post.excerpt}</p>
            <span className="block mt-3 text-xs text-gray-400 ">
              {new Date(post.date).toDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
