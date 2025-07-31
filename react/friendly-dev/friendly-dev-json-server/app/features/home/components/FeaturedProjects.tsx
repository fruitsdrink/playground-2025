import { ProjectCard } from "~/features/projects/components/ProjectCard";
import type { Project } from "~/features/projects/types";

type FeaturedProjectsProp = {
  projects: Project[];
  count?: number;
};
export function FeaturedProjects({
  projects,
  count = 4,
}: FeaturedProjectsProp) {
  const featured = projects
    .filter((project) => project.featured)
    .slice(0, count);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-200">
        🌟 Featured Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
