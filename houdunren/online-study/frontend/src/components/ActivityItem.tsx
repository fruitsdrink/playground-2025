import { Random } from 'mockjs'
import React from 'react'
import classNames from 'classnames'
import { UserIcon } from './UserIcon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const ActivityItem = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          'grid gap-2 content-between pb-3 border-b grid-cols-[auto_1fr]',
          className,
        )}
        {...rest}
        ref={ref}>
        <UserIcon src={`/images/user/${Random.integer(1, 10)}.jpeg`} />

        <div className='grid grid-flow-row'>
          <a href='#' className='text-base font-bold truncate opacity-90'>
            {Random.csentence(20, 80)}
          </a>
          <div className='flex gap-1 self-end text-sm'>
            <div className='px-3 text-white bg-emerald-600 rounded-md'>签到</div>
            <a href='#'>{Random.cname()}</a> 更新于 {Random.integer(2, 100)} 天前
          </div>
        </div>
      </div>
    )
  },
)
