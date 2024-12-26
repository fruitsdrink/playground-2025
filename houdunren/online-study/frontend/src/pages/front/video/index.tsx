import { Play, Time } from '@icon-park/react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Card, Pagination } from 'antd'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/video/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='mx-3 mb-72 lg:container'>
      <Card title='最近更新'>
        <div className='text-base'>
          {[...Array(16)].map((_, index) => {
            return (
              <Link
                to='/front/video/show'
                key={index}
                className='grid items-center py-3 border-b lg:grid-cols-[1fr_auto] first:pt-0'>
                <div className='grid grid-flow-col gap-2 justify-start items-center'>
                  <Play
                    theme='outline'
                    size='20'
                    className='text-green-600'
                    strokeWidth={4}
                  />
                  <div className='truncate'>{Random.csentence(10, 50)}</div>
                  <div className='hidden grid-flow-col gap-1 justify-start items-center text-xs lg:grid text-slate-600/80'>
                    <Time theme='outline' />
                    {Random.integer(10, 200)} 小时前
                  </div>
                </div>
                <div className='hidden justify-self-end lg:flex'>
                  <div className='px-3 py-1 text-xs rounded-lg border bg-slate-50'>
                    {Random.ctitle(10, 20)}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </Card>
      <div className='p-3 mt-3 bg-white rounded-lg'>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </main>
  )
}
