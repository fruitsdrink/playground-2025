import menus from '@/config/menus'
import { HamburgerButton, Youtube } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import { Button, Drawer } from 'antd'
import { useState } from 'react'

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <main className='sticky top-0 z-10 mb-6 bg-white border-t-4 border-b border-rose-600 border-gray-200 shadow-sm backdrop-blur'>
      <section className='grid grid-cols-[1fr_auto] px-3 py-3 lg:container'>
        <div className='hidden gap-2 items-center lg:flex'>
          {/* logo */}
          <Link to='/' className='flex gap-1 items-center text-rose-600'>
            <Youtube theme='outline' size='35' strokeWidth={4} />
            <div className='text-xl font-bold uppercase'>houdunren</div>
          </Link>

          <div className='flex gap-2'>
            {menus.map((menu, index) => {
              return (
                <Link
                  key={index}
                  className='font-bold'
                  to={menu.to ? menu.to : '#'}
                  activeProps={{
                    className: 'text-rose-600',
                  }}>
                  {({ isActive }) => {
                    return isActive ? menu.title : menu.title
                  }}
                  {/* {menu.title} */}
                </Link>
              )
            })}
          </div>
        </div>
        <div className='lg:hidden'>
          <HamburgerButton theme='outline' size='24' fill='#333' onClick={showDrawer} />
          <Drawer
            title=''
            onClose={onClose}
            open={open}
            placement='left'
            extra={
              <div className='flex gap-1 items-center text-rose-600'>
                <Youtube theme='outline' size='30' strokeWidth={4} />
                <div className='text-xl font-bold uppercase'>houdunren</div>
              </div>
            }>
            <div className='grid grid-flow-row gap-2'>
              {menus.map((menu, index) => {
                return (
                  <Link key={index} className='font-bold' to={menu.to ? menu.to : '#'}>
                    {menu.title}
                  </Link>
                )
              })}
            </div>
          </Drawer>
        </div>
        <div className='flex gap-2 justify-self-end'>
          <Link to='/auth/login'>
            <Button type='primary'>登录</Button>
          </Link>
          <Link to='/auth/register'>
            <Button type='default'>注册</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
