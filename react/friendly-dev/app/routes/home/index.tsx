import { FeaturedProjects } from "~/features/home/components/FeaturedProjects";
import type { Route } from "./+types";
import type { Project } from "~/features/projects/types";
import { AboutPreview } from "~/features/home/components/AboutPreview";
import type { PostMeta } from "~/features/blog/types";
import { LatestPosts } from "~/features/home/components/LatestPosts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{
  projects: Project[];
  posts: PostMeta[];
}> {
  const url = new URL("/posts-meta.json", request.url);

  const [projectRes, postRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
    fetch(url.href),
  ]);
  if (!projectRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch data");
  }
  let [projects, posts] = await Promise.all([
    projectRes.json(),
    postRes.json(),
  ]);

  projects = projects.filter((project: Project) => project.featured);

  return {
    projects,
    posts,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects, posts } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
}
