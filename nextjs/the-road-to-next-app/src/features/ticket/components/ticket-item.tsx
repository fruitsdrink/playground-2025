// import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Prisma } from "@/generated/prisma";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TICKET_ICONS } from "../constants";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
};
export function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Button variant={"outline"} asChild size={"icon"}>
      <Link prefetch href={ticketPath(ticket.id)} className="underline">
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = (
    <Button variant={"outline"} asChild size={"icon"}>
      <Link prefetch href={ticketEditPath(ticket.id)} className="underline">
        <LucidePencil />
      </Link>
    </Button>
  );

  // const deleteButton = (
  //   <form action={deleteTicket.bind(null, ticket.id)}>
  //     <Button variant={"outline"} size={"icon"}>
  //       <LucideTrash className="w-4 h-4" />
  //     </Button>
  //   </form>
  // );

  const moreButton = (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size={"icon"}>
          <LucideMoreVertical className="w-4 h-4" />
        </Button>
      }
    />
  );

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <span className="truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)} by {ticket.user.username}
          </p>
        </CardFooter>
      </Card>

      <div className="flex flex-col gap-y-2">
        {isDetail ? (
          <>
            {editButton}
            {moreButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}
