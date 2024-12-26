import { Link } from '@tanstack/react-router'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  img: string
}

export const AuthLayout = React.forwardRef<HTMLDivElement, Props>(
  ({ title, img, children, ...rest }, ref) => {
    const footerMenus = [
      { title: '用户登录', to: '/auth/login' },
      { title: '用户注册', to: '/auth/register' },
      { title: '找回密码', to: '/auth/forget' },
      { title: '网站首页', to: '/' },
    ]
    return (
      <main
        className='bg-[#2c3e50] h-screen w-screen flex justify-center items-center overflow-y-auto'
        {...rest}
        ref={ref}>
        <div className='grid lg:grid-cols-2'>
          <section>
            <div className='bg-gray-100 w-[400px] rounded-lg p-3 md:rounded-r-none'>
              <h2 className='p-4 text-xl font-bold text-center'>{title}</h2>
              {children}
              <div className='grid grid-flow-col gap-3 justify-center mt-12 text-xs font-bold opacity-80'>
                {footerMenus.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    activeProps={{
                      className: 'text-violet-700 hover:text-violet-600',
                    }}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section
            className='w-[400px] rounded-lg rounded-l-none hidden md:block bg-cover bg-no-repeat bg-top'
            style={{
              backgroundImage: `url(${img})`,
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: 'cover',
            }}></section>
        </div>
      </main>
    )
  },
)
