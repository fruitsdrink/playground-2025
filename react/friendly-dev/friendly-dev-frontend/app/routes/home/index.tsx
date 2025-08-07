import { FeaturedProjects } from "~/features/home/components/FeaturedProjects";
import type { Route } from "./+types";
import type { Project, StrapiProject } from "~/features/projects/types";
import { AboutPreview } from "~/features/home/components/AboutPreview";
import type { PostMeta, StrapiPost } from "~/features/blog/types";
import { LatestPosts } from "~/features/home/components/LatestPosts";
import type { StrapiResponse } from "~/types";

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
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
    // fetch(url.href),
  ]);
  if (!projectRes.ok || !postRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const projectsJson: StrapiResponse<StrapiProject[]> = await projectRes.json();
  const postJson: StrapiResponse<StrapiPost[]> = await postRes.json();

  const projects = projectsJson.data.map((project) => {
    return {
      id: project.id,
      documentId: project.documentId,
      title: project.title,
      description: project.description,
      image: project.image?.url
        ? `${project.image.url}`
        : "/images/no-image.png",
      category: project.category,
      url: project.url,
      date: project.date,
      featured: project.featured,
    };
  });

  const posts = postJson.data.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    body: post.body,
    image: post.image?.url ? `${post.image.url}` : "/images/no-image.png",
    date: post.date,
  }));

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
