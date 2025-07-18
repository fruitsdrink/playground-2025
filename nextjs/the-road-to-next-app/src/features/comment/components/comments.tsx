"use client";

import { CardCompact } from "@/components/card-compact";
import { Button } from "@/components/ui/button";
import { CommentWithMetadata } from "../types";
import { CommentCreateForm } from "./comment-create-form";
import { CommentDeleteButton } from "./comment-delete-button";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  ticketId: string;
  comments?: CommentWithMetadata[];
};
export function Comments({ ticketId, comments = [] }: CommentsProps) {
  const handleMore = () => {
    console.log("more");
  };
  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment weill be created"
        content={<CommentCreateForm ticketId={ticketId} />}
      />
      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [<CommentDeleteButton key={"0"} id={comment.id} />]
                : []),
            ]}
          />
        ))}
      </div>
      <div className="flex flex-col justify-center ml-8">
        <Button variant={"ghost"} onClick={handleMore}>
          More
        </Button>
      </div>
    </>
  );
}
