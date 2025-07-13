import { prisma } from "@/lib/prisma";

export async function getComments(ticketId: string) {
  const comments = await prisma.comment.findMany({
    where: { ticketId },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}
