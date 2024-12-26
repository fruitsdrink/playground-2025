import { Comment } from '@/components/comment'
import { LessonVideoList } from '@/components/LessonVideoList'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'antd'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/video/show')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='-mt-6'>
      <section className='bg-slate-900'>
        <div className='container'>
          <video src='' autoPlay loop muted controls className='w-full'></video>
        </div>
      </section>

      <section className='container mt-6'>
        <div className='flex flex-col gap-1 justify-between p-6 bg-white rounded-lg lg:flex-row'>
          <div>
            <div className='text-lg font-bold'>{Random.csentence(10, 30)}</div>
            <div className='mt-1 text-sm'>
              {Random.csentence(6, 20)} -&gt; {Random.csentence(6, 20)}
            </div>
          </div>

          <div className='flex gap-1'>
            <Button
              type='primary'
              size='small'
              className='bg-indigo-500 hover:!bg-indigo-400'>
              章节列表
            </Button>
            <Button
              type='primary'
              size='small'
              className='bg-orange-500 hover:!bg-orange-400'>
              高清下载
            </Button>
            <Button
              type='primary'
              size='small'
              className='bg-lime-500 hover:!bg-lime-400'>
              上一集
            </Button>
          </div>
        </div>
      </section>

      <section className='mt-6 container grid lg:grid-cols-[350px_1fr] items-start'>
        <LessonVideoList />
        <Comment />
      </section>
    </main>
  )
}
