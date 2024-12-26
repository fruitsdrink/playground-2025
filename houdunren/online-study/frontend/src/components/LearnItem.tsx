import { Random } from 'mockjs'
import React from 'react'
import classNames from 'classnames'
import { UserIcon } from './UserIcon'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const LearnItem = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          'grid gap-2 content-between items-center pb-3 border-b grid-cols-[auto_1fr]',
          className,
        )}
        {...rest}
        ref={ref}>
        <UserIcon
          src={`/images/user/${Random.integer(1, 10)}.jpeg`}
          className='w-9 h-9'
        />

        <div className='grid grid-flow-row'>
          <a href='#' className='text-base font-bold truncate opacity-90'>
            {Random.csentence(20, 80)}
          </a>
          <div className='flex gap-1 self-end text-sm'>
            <a href='#'>{Random.cname()}</a> 在 {Random.integer(2, 100)} 分钟前学习
          </div>
        </div>
      </div>
    )
  },
)
