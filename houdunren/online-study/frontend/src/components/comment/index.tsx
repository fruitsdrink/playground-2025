import { cn } from '@/lib/utils'
import { Card } from 'antd'
import { CommentItem } from './CommentItem'

type Props = {
  className?: string
}
export const Comment = ({ className }: Props) => {
  return (
    <main className={cn('container', className)}>
      <Card title='评论'>
        <div className='space-y-3'>
          {[...Array(10)].map((_, index) => (
            <CommentItem key={index} />
          ))}
        </div>
      </Card>
    </main>
  )
}
