import { Tip } from '@/components/Tip'
import { TopicItem } from '@/components/TopicItem'
import { EmotionHappy } from '@icon-park/react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, Pagination } from 'antd'

export const Route = createFileRoute('/front/topic/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='mx-3 lg:container grid lg:grid-cols-[1fr_350px]  gap-6 items-start'>
      <div className=''>
        <Card
          className='text-base'
          title='交流讨论'
          extra={
            <div className='flex gap-2 items-center'>
              <EmotionHappy
                theme='outline'
                strokeWidth={5}
                size={20}
                className='text-green-700'
              />
              每次温暖的交流，都是对你的成长
            </div>
          }>
          <div className='grid grid-flow-row gap-3'>
            {[...Array(10)].map((_, index) => (
              <TopicItem key={index} />
            ))}
          </div>
        </Card>
        <div className='p-3 mt-3 bg-white rounded-lg'>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
      <Tip />
    </main>
  )
}
