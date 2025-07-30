import { FeaturedProjects } from "~/features/home/components/FeaturedProjects";
import type { Route } from "./+types";
import type { Project } from "~/features/projects/types";
import { AboutPreview } from "~/features/home/components/AboutPreview";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
}

export async function loader({}: Route.LoaderArgs): Promise<{
  projects: Project[];
}> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  let projects = await res.json();
  projects = projects.filter((project: Project) => project.featured);

  return {
    projects,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
    </>
  );
}
