import type { Project } from "~/features/projects/types";
import type { Route } from "./+types";
import { ProjectCard } from "~/features/projects/components/ProjectCard";
import { useState } from "react";
import { Pagination } from "~/components/Pagination";
import { AnimatePresence, motion } from "motion/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Projects" },
    { name: "description", content: "My website project protfilio" },
  ];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{
  projects: Project[];
}> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`);
  const data = await res.json();

  return {
    projects: data,
  };
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const countPerPage = 10;

  let { projects } = loaderData;

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  projects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const totalPage = Math.ceil(projects.length / countPerPage);
  const indexOfLast = currentPage * countPerPage;
  const indexOfFirst = indexOfLast - countPerPage;
  const items = projects.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className="text-3xl font-bold text-white mb-8">🚀 Projects</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          {items.map((project) => (
            <motion.div key={project.id} layout>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
