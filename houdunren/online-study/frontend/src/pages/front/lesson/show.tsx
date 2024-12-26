import { LessonItem } from '@/components/LessonItem'
import { LessonVideoList } from '@/components/LessonVideoList'
import { createFileRoute } from '@tanstack/react-router'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/lesson/show')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <section
        className='-mt-6 bg-no-repeat bg-cover'
        style={{
          backgroundImage: 'url(/images/lesson/2.jpeg)',
        }}>
        <div className='py-16 backdrop-blur-lg'>
          <div className='container'>
            <div className='text-xl font-bold text-gray-200 lg:text-3xl'>
              {Random.csentence(10, 20)}
            </div>
            <div className='mt-5 text-white/60'>{Random.csentence(20, 50)}</div>
          </div>
        </div>
      </section>

      <section className='container grid lg:grid-cols-[1fr_350px] mt-6 gap-6'>
        <LessonVideoList />
        <div className='hidden -mt-32 lg:block'>
          <LessonItem src='/images/lesson/2.jpeg' />
        </div>
      </section>
    </main>
  )
}
