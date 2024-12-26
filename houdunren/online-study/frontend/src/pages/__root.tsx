import { ScrollToTop } from '@/components/ScrollToTop'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ScrollToTop>
      <Outlet />
      <TanStackRouterDevtools />
    </ScrollToTop>
  )
}
