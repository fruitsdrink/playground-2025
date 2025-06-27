"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function updateTicket(id: string, formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.update({
    where: { id },
    data,
  });

  revalidatePath(ticketsPath());
  redirect(ticketsPath());
}
