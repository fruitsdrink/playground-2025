import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Comments } from "@/features/comment/components/comments";
import { getComments } from "@/features/comment/queries/get-comments";
import { TicketItem } from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { homePath } from "@/paths";

type TicketPageProps = {
  params: Promise<{
    ticketId: string;
  }>;
};
export default async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const [ticket, comments] = await Promise.all([
    getTicket(ticketId),
    getComments(ticketId),
  ]);

  if (!ticket) {
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
          },
        ]}
      />
      <Separator />
      <div className="flex justify-center animate-fade-in-from-top">
        <TicketItem
          ticket={ticket}
          isDetail
          comments={<Comments ticketId={ticket.id} comments={comments} />}
        />
      </div>
    </div>
  );
}

// export async function generateStaticParams() {
//   const tickets = await getTickets(); // Assuming this returns all tickets or a list of ticket IDs
//   return tickets.map((ticket) => ({
//     ticketId: ticket.id,
//   }));
// }
