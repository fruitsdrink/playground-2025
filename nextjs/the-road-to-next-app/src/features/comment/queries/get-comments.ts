"use server";

import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getComments(ticketId: string, cursor?: string) {
  const { user } = await getAuth();

  // const skip = offset ?? 0;
  const take = 2;

  const where: Prisma.CommentWhereInput = {
    ticketId,
    id: {
      lt: cursor,
    },
  };

  const [comments, count] = await prisma.$transaction([
    prisma.comment.findMany({
      where,
      // skip,
      take: take + 1,
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
        {
          id: "desc",
        },
      ],
    }),

    prisma.comment.count({
      where,
    }),
  ]);

  const hasNextPage = comments.length > take;

  if (hasNextPage) {
    comments.pop(); // Remove the last comment to ensure we only return the requested number of comments
  }

  return {
    list: comments.map((comment) => ({
      ...comment,
      isOwner: isOwner(user, comment),
    })),
    metadata: {
      count,
      // hasNextPage: count > skip + take,
      hasNextPage,
      cursor: comments.at(-1)?.id,
    },
  };
}
