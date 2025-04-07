import { RouterProvider, createRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { routeTree } from "../routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    user: {
      id: "",
      username: "",
    },
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const useAppRouter = () => {
  const user = {
    id: "1",
    username: "John Doe",
  };
  const AppRouterProvider = () => (
    <>
      <RouterProvider router={router} context={{ user }} />
      <TanStackRouterDevtools router={router} />
    </>
  );
  return {
    AppRouterProvider,
  };
};
