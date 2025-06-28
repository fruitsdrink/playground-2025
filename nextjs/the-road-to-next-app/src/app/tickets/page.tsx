import { Suspense } from "react";
import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { RedirectToast } from "@/components/redirect-toast";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

// export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
// export const revalidate = 5; // Reval date every 30 seconds

export default async function TicketsPage() {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-8">
        <Heading
          title="Tickets Page"
          description="All your tickets at one place"
        />

        <CardCompact
          className="w-full max-w-[420px] self-center"
          title="Create Ticket"
          description="A new ticket will be created."
          content={<TicketUpsertForm />}
        />

        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
      <RedirectToast />
    </>
  );
}
