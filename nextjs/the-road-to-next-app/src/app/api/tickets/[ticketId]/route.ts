import { getTicket } from "@/features/ticket/queries/get-ticket";

export async function GET(
  _request: Request,
  { params }: { params: { ticketId: string } }
) {
  const { ticketId } = params;

  const ticket = await getTicket(ticketId);

  return Response.json(ticket);
}
