import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/front')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Navbar />
      <div className='mb-12'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
