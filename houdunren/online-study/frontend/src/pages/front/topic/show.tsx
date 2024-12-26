import { Comment } from '@/components/comment'
import { UserIcon } from '@/components/UserIcon'
import { GoodTwo, Time } from '@icon-park/react'
import { createFileRoute } from '@tanstack/react-router'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/topic/show')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main className='container bg-white rounded-lg'>
        <section className='p-6'>
          <div className='pb-6 mb-6 border-b'>
            <h1 className='mb-4 text-xl font-bold'>{Random.csentence(10, 20)}</h1>
            <div className='flex gap-2'>
              <UserIcon
                src={`/images/user/${Random.integer(1, 10)}.jpeg`}
                className='w-10 h-10'
              />
              <div className='flex flex-col justify-between text-gray-500'>
                <p className='text-sm font-bold'>{Random.csentence(3, 6)}</p>
                <div className='flex items-center text-xs'>
                  <Time theme='outline' size='16' /> 发表于 {Random.integer(10, 30)} 天前
                </div>
              </div>
            </div>
          </div>
          <div className='leading-8'>{Random.cparagraph(10, 30)}</div>
        </section>

        <section className='flex flex-col gap-2 items-center py-6 pt-12 mt-12'>
          <div className='rounded-lg px-3 py-2 bg-[#10ac84] flex justify-center items-center text-white text-sm cursor-pointer hover:bg-[#1dd1a1] gap-2'>
            <GoodTwo theme='outline' size='20' />
            感谢 97 个朋友的点赞
          </div>
          <div className='flex flex-wrap gap-2 justify-center pb-12 mt-6'>
            {[...Array(10)].map((_, index) => (
              <UserIcon
                key={index}
                src={`/images/user/${Random.integer(1, 10)}.jpeg`}
                className='w-10 h-10 rounded-full'
              />
            ))}
          </div>
        </section>
      </main>
      <Comment className='px-0 mt-6' />
    </>
  )
}
