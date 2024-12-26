import { LessonItem } from '@/components/LessonItem'
import { createFileRoute } from '@tanstack/react-router'
import { Card } from 'antd'

export const Route = createFileRoute('/front/lesson/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className='mx-3 lg:container'>
      <Card title='碎片课程'>
        <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-3'>
          {[...Array(12)].map((_, index) => {
            return <LessonItem src={`/images/lesson/${index + 1}.jpeg`} key={index} />
          })}
        </div>
      </Card>
    </main>
  )
}
