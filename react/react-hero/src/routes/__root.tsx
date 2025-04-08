import {
  createRootRouteWithContext,
  Outlet,
  Scripts,
  HeadContent,
} from "@tanstack/react-router";

interface RouterContext {
  user: {
    id: string;
    username: string;
  };
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <main>
      <HeadContent />
      <Outlet />
      <Scripts />
    </main>
  ),
});
