"use client";

import { LucideTrash } from "lucide-react";
import { toast } from "sonner";
import { useConfirmDialog } from "@/components/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket, TicketStatus } from "@/generated/prisma";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TICKET_STATUS_LABEL } from "../constants";

type TicketMoreMenuProps = {
  ticket: Ticket;
  trigger: React.ReactNode;
};
export function TicketMoreMenu({ ticket, trigger }: TicketMoreMenuProps) {
  const [deleteButton, deleteDialog] = useConfirmDialog({
    title: "Delete Ticket",
    description:
      "Are you sure you want to delete this ticket? This action cannot be undone.",
    action: deleteTicket.bind(null, ticket.id),
    trigger: (
      <DropdownMenuItem>
        <LucideTrash className="w-4 h-4 mr-2" />
        <span>Delete</span>
      </DropdownMenuItem>
    ),
  });

  const handleUpdateStatus = async (value: string) => {
    const promise = updateTicketStatus(ticket.id, value as TicketStatus);
    toast.promise(promise, {
      loading: "Updating ticket status...",
    });

    const result = await promise;
    if (result.status === "ERROR") {
      toast.error(result.message || "Failed to update ticket status");
    } else if (result.status === "SUCCESS") {
      toast.success(result.message || "Ticket status updated successfully");
    }
  };

  const ticketStatusRadioGroupItems = (
    <DropdownMenuRadioGroup
      value={ticket.status}
      onValueChange={handleUpdateStatus}
    >
      {(Object.keys(TICKET_STATUS_LABEL) as Array<TicketStatus>).map((key) => (
        <DropdownMenuRadioItem key={key} value={key}>
          {TICKET_STATUS_LABEL[key]}
        </DropdownMenuRadioItem>
      ))}
    </DropdownMenuRadioGroup>
  );

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          {ticketStatusRadioGroupItems}
          <DropdownMenuSeparator />
          {deleteButton}
        </DropdownMenuContent>
      </DropdownMenu>
      {deleteDialog}
    </>
  );
}
