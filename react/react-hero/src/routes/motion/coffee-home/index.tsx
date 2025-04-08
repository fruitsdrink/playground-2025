import { createFileRoute } from "@tanstack/react-router";
import { AppBanner, Footer, Hero, Services, WhereToBuy } from "./-components";

export const Route = createFileRoute("/motion/coffee-home/")({
  component: RouteComponent,

  head: () => ({
    meta: [
      {
        title: "Coders Coffee Home Page",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <main className="overflow-x-hidden coffee-home">
      <Hero />
      <Services />
      <WhereToBuy />
      <AppBanner />
      <Footer />
    </main>
  );
}
