import { ChapterItem } from '@/components/ChapterItem'
import { ChapterLayout } from '@/layouts/ChapterLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Random } from 'mockjs'

export const Route = createFileRoute('/front/chapter/system')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <ChapterLayout
      title='系统课程'
      description='系统课程指从零开始学习一门编程语言，比如从零开始学习JavaScript编程语言'>
      {[...Array(12)].map((_, index) => (
        <ChapterItem
          key={index}
          src={`/images/system/${index + 1}.jpeg`}
          title={Random.csentence(10, 20)}
          description={Random.csentence(20, 80)}
        />
      ))}
    </ChapterLayout>
  )
}
