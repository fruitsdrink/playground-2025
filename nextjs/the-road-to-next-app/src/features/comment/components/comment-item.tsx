import { format } from "date-fns";
import React from "react";
import { Card } from "@/components/ui/card";
import { CommentWithMetadata } from "../types";

type CommentItemProps = {
  comment: CommentWithMetadata;
  buttons: React.ReactNode[];
};
export function CommentItem({ comment, buttons }: CommentItemProps) {
  return (
    <div className="flex gap-x-2">
      <Card className="p-4 flex-1 flex flex-col gap-y-1">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            {comment.user?.username ?? "Deleted User"}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(comment.createdAt, "yyyy-MM-dd HH:mm")}
          </p>
        </div>
        <p className="whitespace-pre-line">{comment.content}</p>
      </Card>
      <div className="flex flex-col gap-y-1">{buttons}</div>
    </div>
  );
}
