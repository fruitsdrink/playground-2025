import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams
) {
  const { search, sortKey, sortValue, page, size } = await searchParams;

  return await prisma.ticket.findMany({
    where: {
      userId,
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy: {
      // createdAt: "desc",
      // ...(sort === "newest" && { createdAt: "desc" }),
      // ...(sort === "bounty" && { bounty: "desc" }),
      [sortKey]: sortValue,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}
