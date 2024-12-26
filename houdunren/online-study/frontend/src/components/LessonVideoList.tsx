import { Play } from '@icon-park/react'
import { Link } from '@tanstack/react-router'
import { Random } from 'mockjs'

export const LessonVideoList = () => {
  return (
    <div className='py-6 bg-white rounded-lg'>
      <div className='pb-6 mb-3 border-b'>
        <div className='px-6 mb-3 font-bold'>视频列表</div>
        <div className='px-3 py-1 mx-6 text-xs bg-gray-100 rounded-lg'>
          还有 30 课时就学完了，加油！
        </div>
      </div>
      <div className='flex flex-col gap-3 px-6'>
        {[...Array(12)].map((_, index) => (
          <Link to='#' key={index} className='flex gap-2 items-center pb-3 border-b'>
            <Play theme='outline' size='24' />
            <div className='truncate'>{Random.csentence(10, 20)}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
