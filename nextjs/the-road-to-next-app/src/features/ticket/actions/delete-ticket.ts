"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function deleteTicket(ticketId: string) {
  const { user } = await getAuthRedirect();
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  // revalidatePath(ticketPath(ticketId));
  await setCookieByKey("toast", "Ticket deleted successfully!");
  redirect(ticketsPath());
}
