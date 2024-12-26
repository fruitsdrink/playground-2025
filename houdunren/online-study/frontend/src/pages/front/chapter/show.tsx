import { LessonItem } from '@/components/LessonItem'
import { createFileRoute } from '@tanstack/react-router'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/chapter/show')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <section className='bg-[#2c3e50] py-12  -mt-6'>
        <div className='container'>
          <div className='text-3xl font-bold text-gray-200'>
            {Random.csentence(10, 20)}
          </div>
          <div className='mt-5 text-white/60'>{Random.csentence(20, 50)}</div>
        </div>
      </section>

      <section className='container'>
        <div className='grid gap-4 p-3 mt-6 bg-white rounded-lg lg:grid-cols-4 md:grid-cols-3'>
          {[...Array(12)].map((_, index) => (
            <LessonItem key={index} src={`/images/lesson/${index + 1}.jpeg`} />
          ))}
        </div>
      </section>
    </main>
  )
}
