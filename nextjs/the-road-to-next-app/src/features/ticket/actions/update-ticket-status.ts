"use server";

import { revalidatePath } from "next/cache";
import {
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { TicketStatus } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function updateTicketStatus(
  ticketId: string,
  status: TicketStatus
) {
  try {
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
