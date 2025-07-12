import { Placeholder } from "@/components/placeholder";
import { getTickets } from "../queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import { TicketItem } from "./ticket-item";
import { TicketPagination } from "./ticket-pagination";
import { TicketSearchInput } from "./ticket-search-input";
import { TicketSortSelect } from "./ticket-sort-select";

type TicketListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};
export async function TicketList({ userId, searchParams }: TicketListProps) {
  const tickets = await getTickets(userId, searchParams);

  return (
    <div className="flex-1 flex flex-col gap-y-4 items-center animate-fade-in-from-top">
      <div className="w-full max-w-[420px] gap-x-2 flex">
        <TicketSearchInput placeholder="Search tickets..." />
        <TicketSortSelect
          // options={[
          //   { label: "Newest", value: "newest" },
          //   { label: "Bounty", value: "bounty" },
          // ]}
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "createdAt",
              sortValue: "asc",
              label: "Oldest",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "Bounty",
            },
          ]}
        />
      </div>
      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-[420px]">
        <TicketPagination />
      </div>
    </div>
  );
}
