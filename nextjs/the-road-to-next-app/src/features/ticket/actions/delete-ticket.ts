"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { setCookieByKey } from "@/actions/cookies";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function deleteTicket(ticketId: string) {
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });

  revalidatePath(ticketsPath());
  // revalidatePath(ticketPath(ticketId));
  await setCookieByKey("toast", "Ticket deleted successfully!");
  redirect(ticketsPath());
}
