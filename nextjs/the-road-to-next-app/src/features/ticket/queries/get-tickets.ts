import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ParsedSearchParams } from "../search-params";

export async function getTickets(
  userId: string | undefined,
  searchParams: ParsedSearchParams
) {
  const { search, sortKey, sortValue, page, size } = await searchParams;

  const where: Prisma.TicketWhereInput = {
    userId,
    title: {
      contains: search,
      mode: "insensitive" as const,
    },
  };

  const skip = page * size;
  const take = size;

  const [tickets, count] = await prisma.$transaction([
    prisma.ticket.findMany({
      where,
      skip,
      take,
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
    }),
    prisma.ticket.count({ where }),
  ]);

  return {
    list: tickets,
    metadata: {
      page,
      size,
      count,
      hasNextPage: count > skip + take,
    },
  };
}
