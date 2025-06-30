"use client";

import { useActionState } from "react";
import { useRef } from "react";
import {
  DatePicker,
  ImperativeHandleFromDataPicker,
} from "@/components/date-picker";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ticket } from "@/generated/prisma";
import { fromCent } from "@/utils/currency";
import { upsertTicket } from "../actions/upsert-ticket";

type TicketUpdateFormProps = {
  ticket?: Ticket;
};
export function TicketUpsertForm({ ticket }: TicketUpdateFormProps) {
  const [actionState, action] = useActionState(
    upsertTicket.bind(null, ticket?.id),
    EMPTY_ACTION_STATE
  );

  const datePickerImperativeHandleRef =
    useRef<ImperativeHandleFromDataPicker>(null);

  const handleOnSuccess = () => {
    datePickerImperativeHandleRef.current?.reset();
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleOnSuccess}>
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
      <FieldError actionState={actionState} name="title" />
      <Label htmlFor="content">Content</Label>
      <Textarea
        id="content"
        name="content"
        placeholder="Enter ticket content"
        defaultValue={
          (actionState.payload?.get("content") as string) ?? ticket?.content
        }
      />
      <FieldError actionState={actionState} name="content" />
      <div className="flex gap-x-2 mb-1">
        <div className="w-1/2">
          <Label htmlFor="deadline" className="mb-4">
            Deadline
          </Label>
          <DatePicker
            // key={actionState.timestamp} // 表单重置后重置日期
            id="deadline"
            name="deadline"
            defaultValue={
              (actionState.payload?.get("deadline") as string) ??
              ticket?.deadline
            }
            imperativeHandleRef={datePickerImperativeHandleRef}
          />
          <FieldError actionState={actionState} name="deadline" />
        </div>
        <div className="w-1/2">
          <Label htmlFor="bounty" className="mb-4">
            Bounty
          </Label>
          <Input
            type="number"
            id="bounty"
            name="bounty"
            step={0.01}
            defaultValue={
              (actionState.payload?.get("bounty") as string) ??
              (ticket?.bounty ? fromCent(ticket?.bounty) : "")
            }
          />
          <FieldError actionState={actionState} name="bounty" />
        </div>
      </div>
      <SubmitButton label={ticket ? "Update" : "Create"} />
    </Form>
  );
}
