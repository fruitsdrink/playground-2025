import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  queryOptions,
  useMutation,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { deleteIdea, fetchIdea } from "@/api/ideas";
import { useAuth } from "@/context/auth-context";

const ideaQueryOptions = (ideaId: string) =>
  queryOptions({
    queryKey: ["ideas", ideaId],
    queryFn: () => fetchIdea(ideaId),
  });

export const Route = createFileRoute("/ideas/$ideaId/")({
  component: IdeaDetailPage,
  loader: async ({ params: { ideaId }, context: { queryClient } }) => {
    return queryClient.ensureQueryData(ideaQueryOptions(ideaId));
  },
});

function IdeaDetailPage() {
  const { ideaId } = Route.useParams();
  const { data: idea } = useSuspenseQuery(ideaQueryOptions(ideaId));

  const navigate = useNavigate();
  const { user } = useAuth();

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => deleteIdea(ideaId),
    onSuccess: () => {
      navigate({ to: "/ideas" });
    },
  });

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this idea?")) {
      try {
        await deleteMutate();
      } catch (err) {
        console.error(err);
        alert("Failed to delete idea");
      }
    }
  };

  return (
    <div className="p-4">
      <Link to="/ideas" className="text-blue-500 underline block mb-4">
        Back To Ideas
      </Link>
      <h2 className="text-2xl font-bold">{idea.title}</h2>
      <p className="mt-2">{idea.description}</p>

      {user && user.id === idea.user && (
        <>
          <Link
            to="/ideas/$ideaId/edit"
            params={{ ideaId }}
            className="inline-block text-sm bg-yellow-500 hover:bg-yellow-600 text-white mt-4 mr-2 px-4 py-2 rounded transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-sm bg-red-600 hover:bg-red-700 text-white mt-4 px-4 py-2 rounded transition disabled:opacity-50"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </>
      )}
    </div>
  );
}
