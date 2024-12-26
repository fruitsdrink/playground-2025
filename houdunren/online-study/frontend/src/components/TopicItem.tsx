import { Random } from 'mockjs'
import classNames from 'classnames'
import { UserIcon } from './UserIcon'
import { Link } from '@tanstack/react-router'

interface Props {
  className?: string
}

export const TopicItem = ({ className }: Props) => {
  return (
    <Link
      to='/front/topic/show'
      className={classNames(
        'grid gap-2 content-between pb-3 border-b grid-cols-[auto_1fr]',
        className,
      )}>
      <UserIcon src={`/images/user/${Random.integer(1, 10)}.jpeg`} />

      <div className='grid grid-flow-row'>
        <a href='#' className='text-base font-bold truncate opacity-90'>
          {Random.csentence(20, 80)}
        </a>
        <div className='flex gap-1 self-end text-sm'>
          <a href='#'>{Random.cname()}</a> 更新于 {Random.integer(2, 100)} 天前
        </div>
      </div>
    </Link>
  )
}
