import { Random } from 'mockjs'
import { UserIcon } from '../UserIcon'
import { Delete, Time } from '@icon-park/react'

export const CommentItem = () => {
  return (
    <section className='overflow-hidden rounded-lg border'>
      <div className='flex justify-between items-center p-3'>
        <div className='flex gap-2'>
          <UserIcon
            src={`/images/user/${Random.integer(1, 10)}.jpeg`}
            className='w-10 h-10'
          />
          <div className='flex flex-col justify-between text-gray-500'>
            <p className='text-sm font-bold'>{Random.csentence(3, 6)}</p>
            <div className='flex items-center text-xs'>
              <Time theme='outline' size='16' /> 发表于 {Random.integer(10, 30)} 天前
            </div>
          </div>
        </div>
        <div>
          <Delete
            theme='outline'
            size='16'
            className='duration-300 cursor-pointer text-gray-900/60 hover:text-gray-900'
            strokeWidth={4}
          />
        </div>
      </div>

      <div className='p-3 bg-slate-100'>{Random.csentence(20, 40)}</div>
    </section>
  )
}
