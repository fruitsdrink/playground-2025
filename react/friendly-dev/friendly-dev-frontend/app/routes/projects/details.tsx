import type { Project, StrapiProject } from "~/features/projects/types";
import type { Route } from "./+types/details";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import type { StrapiResponse } from "~/types";

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<Project> {
  const { id } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/projects/${id}?populate=*`
  );

  if (!res.ok) throw new Response("Not Found", { status: 404 });

  const { data, error } = (await res.json()) as StrapiResponse<StrapiProject>;
  if (error) throw new Response("Not Found", { status: 404 });

  return {
    id: data.id,
    documentId: data.documentId,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    featured: data.featured,
    url: data.url,
    image: data.image?.url ? `${data.image.url}` : "/images/no-image.png",
  };
}

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

export default function ProjectDetailsPage({
  loaderData: project,
}: Route.ComponentProps) {
  return (
    <>
      <Link
        to={"/projects"}
        className="flex items-center text-blue-400 hover:text-blue-500 mb-6 transition"
      >
        <FaArrowLeft className="mr-2" /> Back To Projects
      </Link>
      <div className="grid gap-8 md:grid-cols-2 items-start">
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-lg shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            {project.title}
          </h1>
          <p className="text-gray-300 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} ・ {project.category}
          </p>
          <p className="text-gray-200 mb-6">{project.description}</p>
          <a
            href={project.url}
            target="_blank"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-2xl transition"
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
}
