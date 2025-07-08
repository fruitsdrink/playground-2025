"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
) {
  const { user } = await getAuthRedirect();

  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    if (!ticket || !isOwner(user, ticket)) {
      return toActionState("ERROR", "Not authorized");
    }

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status },
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }

  revalidatePath(ticketsPath());
  return toActionState("SUCCESS", "Ticket status updated successfully");
}
