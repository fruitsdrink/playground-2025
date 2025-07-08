import { getTickets } from "../queries/get-tickets";
import { TicketItem } from "./ticket-item";

type TicketListProps = {
  userId?: string;
};
export async function TicketList({ userId }: TicketListProps) {
  const tickets = await getTickets(userId);

  return (
    <div className="flex-1 flex flex-col gap-y-4 items-center animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}
