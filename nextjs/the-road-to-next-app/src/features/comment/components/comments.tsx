"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { PaginationData } from "@/types/pagination";
import { getComments } from "../queries/get-comments";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginationData<CommentWithMetadata>;
};
export function Comments({ ticketId }: CommentsProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", ticketId],
      queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) =>
        lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    });

  const comments = data?.pages.flatMap((page) => page.list) || [];
  // const [comments, setComments] = useState(paginatedComments.list || []);
  // const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = () => {
    fetchNextPage();
    // const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    // const moreComments = morePaginatedComments.list || [];
    // setComments((prev) => [...prev, ...moreComments]);
    // setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = (id: string) => {
    // setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    // if (!comment) return;
    // setComments((prev) => [comment, ...prev]);
  };
  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment weill be created"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key={"0"}
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center ml-8">
        {hasNextPage && (
          <Button
            variant={"ghost"}
            onClick={handleMore}
            disabled={isFetchingNextPage}
          >
            More
          </Button>
        )}
      </div>
    </>
  );
}
