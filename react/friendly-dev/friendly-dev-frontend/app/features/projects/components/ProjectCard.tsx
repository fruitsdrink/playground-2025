import { Link } from "react-router";
import type { Project } from "../types";

type ProjectCardProps = {
  project: Project;
};
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.documentId}`}
      className="block transform transition duration-300 hover:scale-[1.02]"
    >
      <div className="bg-gray-800 border border-gray-200 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-5">
          <h3 className="text-3xl font-semibold text-blue-400 mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-gray-300 mb-2 line-clamp-1">
            {project.description}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
