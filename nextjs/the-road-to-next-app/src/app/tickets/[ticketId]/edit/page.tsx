import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath, ticketPath } from "@/paths";

type TicketEditPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};
export default async function TicketEditPage({ params }: TicketEditPageProps) {
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const { user } = await getAuth();

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-8 flex-1">
      <Breadcrumbs
        breadcrumbs={[
          {
            title: "Tickets",
            href: homePath(),
          },
          {
            title: ticket.title,
            href: ticketPath(ticket.id),
          },
          {
            title: "Edit",
          },
        ]}
      />
      <Separator />
      <div className="w-full flex-1 flex justify-center items-center">
        <CardCompact
          title="Edit Ticket"
          description="Edit an existing ticket."
          content={<TicketUpsertForm ticket={ticket} />}
          className="w-full max-w-[420px] self-center animate-fade-in-from-top"
        />
      </div>
    </div>
  );
}
