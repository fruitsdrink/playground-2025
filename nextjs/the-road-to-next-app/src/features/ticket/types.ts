export type TicketStatus = "open" | "done" | "in-progress";
export type Ticket = {
  id: string;
  title: string;
  content: string;
  status: TicketStatus;
};
