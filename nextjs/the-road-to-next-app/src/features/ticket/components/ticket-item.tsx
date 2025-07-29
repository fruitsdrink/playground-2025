"use client";

import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketEditPath, ticketPath } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";
import { TICKET_ICONS } from "../constants";
import { TicketWithMetadata } from "../types";
import { TicketMoreMenu } from "./ticket-more-menu";

type TicketItemProps = {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
};

export function TicketItem({ ticket, isDetail, comments }: TicketItemProps) {
  const detailButton = (
    <Button variant={"outline"} asChild size={"icon"}>
      <Link prefetch href={ticketPath(ticket.id)} className="underline">
        <LucideSquareArrowOutUpRight />
      </Link>
    </Button>
  );

  const editButton = ticket.isOwner ? (
    <Button variant={"outline"} asChild size={"icon"}>
      <Link prefetch href={ticketEditPath(ticket.id)} className="underline">
        <LucidePencil />
      </Link>
    </Button>
  ) : null;

  // const deleteButton = (
  //   <form action={deleteTicket.bind(null, ticket.id)}>
  //     <Button variant={"outline"} size={"icon"}>
  //       <LucideTrash className="w-4 h-4" />
  //     </Button>
  //   </form>
  // );

  const moreButton = ticket.isOwner ? (
    <TicketMoreMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size={"icon"}>
          <LucideMoreVertical className="w-4 h-4" />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("w-full flex flex-col gap-y-4", {
        "max-w-[580px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <div className="flex gap-x-2">
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
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
            <p className="text-sm text-muted-foreground">
              {toCurrencyFromCent(ticket.bounty)}
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

      {comments}
    </div>
  );
}
