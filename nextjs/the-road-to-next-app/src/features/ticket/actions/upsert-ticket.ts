"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";

const upsertTicketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(191, "Title must be less than 191 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content must be less than 1024 characters"),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: data,
      update: data,
    });
  } catch (error) {
    console.error("Error upsert ticket:", error);
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());
  if (id) {
    redirect(ticketPath(id));
  }

  return { message: "Ticket created successfully!" };
}
