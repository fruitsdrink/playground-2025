import { ChapterItem } from '@/components/ChapterItem'
import { ChapterLayout } from '@/layouts/ChapterLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/chapter/project')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ChapterLayout
      title='项目课程'
      description='以下是提高你编程能力的实战项目，希望能够帮助到你'>
      {[...Array(12)].map((_, index) => (
        <ChapterItem
          key={index}
          src={`/images/project/${index + 1}.jpeg`}
          title={Random.csentence(10, 20)}
          description={Random.csentence(20, 80)}
        />
      ))}
    </ChapterLayout>
  )
}
