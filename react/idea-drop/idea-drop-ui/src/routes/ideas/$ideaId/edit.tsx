import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetchIdea, updateIdea } from "@/api/ideas";
import { useState } from "react";

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ["ideas", ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute("/ideas/$ideaId/edit")({
  component: EditIdeaPage,
  loader: ({ params: { ideaId }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(ideaId));
  },
});

function EditIdeaPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const [title, setTitle] = useState(idea.title);
  const [summary, setSummary] = useState(idea.summary);
  const [description, setDescription] = useState(idea.description);
  const [tagsInput, setTagsInput] = useState(idea.tags?.join(", "));

  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      updateIdea(ideaId, {
        title,
        summary,
        description,
        createdAt: idea.createdAt,
        tags: tagsInput
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      }),
    onSuccess: () => {
      alert("Idea updated successfully!");
      navigate({ to: "/ideas/$ideaId", params: { ideaId } });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim() || !description.trim()) {
      alert("Please fill out all fields");
      return;
    }
    try {
      await mutateAsync();
    } catch (err) {
      console.error(err);
      alert("Failed to update idea");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Edit Idea</h1>
        <Link
          to="/ideas/$ideaId"
          params={{ ideaId }}
          className="text-sm text-blue-600 hover:underline"
        >
          Back To Idea
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-1"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter idea title"
          />
        </div>
        <div>
          <label
            htmlFor="summary"
            className="block text-gray-700 font-medium mb-1"
          >
            Summary
          </label>
          <input
            id="summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter idea summary"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write out the description of your idea"
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block text-gray-700 font-medium mb-1"
          >
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="optional tags, comma separated"
          />
        </div>
        <div className="mt-5">
          <button
            type="submit"
            disabled={isPending}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Updating..." : "Update Idea"}
          </button>
        </div>
      </form>
    </div>
  );
}
