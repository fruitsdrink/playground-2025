"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookieByKey } from "@/actions/cookies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/paths";
import { toCent } from "@/utils/currency";

const upsertTicketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(191, "Title must be less than 191 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content must be less than 1024 characters"),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  bounty: z.coerce.number().positive(),
});

export async function upsertTicket(
  id: string | undefined,
  _actionState: ActionState,
  formData: FormData
) {
  const { user } = await getAuthRedirect();

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({
        where: { id },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("ERROR", "Not authorized");
      }
    }

    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
    });

    const dbData = {
      ...data,
      userId: user.id,
      bounty: toCent(data.bounty),
    };

    await prisma.ticket.upsert({
      where: { id: id || "" },
      create: dbData,
      update: dbData,
    });
  } catch (error) {
    console.error("Error upsert ticket:", error);
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());
  if (id) {
    await setCookieByKey("toast", "Ticket updated successfully!");
    redirect(ticketPath(id));
  }

  return toActionState("SUCCESS", "Ticket created successfully!");
}
