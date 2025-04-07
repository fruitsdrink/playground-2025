import { createFileRoute } from "@tanstack/react-router";
import { Hero, Services, WhereToBuy } from "./-components";

export const Route = createFileRoute("/motion/coffee-home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="overflow-x-hidden coffee-home">
      <Hero />
      <Services />
      <WhereToBuy />
    </main>
  );
}
