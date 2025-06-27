"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/form/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpdateFormProps = {
  ticket?: Ticket;
};
export function TicketUpsertForm({ ticket }: TicketUpdateFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    {
      message: "",
    }
  );
  return (
    <form action={action} className="flex flex-col gap-y-4">
      <Label htmlFor="title">Title</Label>
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="Enter ticket title"
        defaultValue={
          (actionState.payload?.get("title") as string) ?? ticket?.title
        }
      />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        placeholder="Enter ticket content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <SubmitButton label={ticket ? "Update" : "Create"} />
      {actionState.message}
    </form>
  );
}
