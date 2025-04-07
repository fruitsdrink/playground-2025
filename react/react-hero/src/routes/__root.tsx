import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  user: {
    id: string;
    username: string;
  };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <main>
      <Outlet />
    </main>
  ),
});
