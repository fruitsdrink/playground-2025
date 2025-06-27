"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

export async function CreateTicket(formData: FormData) {
  const data = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
  };

  await prisma.ticket.create({
    data,
  });

  revalidatePath(ticketsPath());
}
