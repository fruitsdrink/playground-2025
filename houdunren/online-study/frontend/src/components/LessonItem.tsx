import { Link } from '@tanstack/react-router'
import { Random } from 'mockjs'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string
}

export const LessonItem = React.forwardRef<HTMLDivElement, Props>(({ src }, ref) => {
  return (
    <div className='overflow-hidden bg-white rounded-lg border cursor-pointer' ref={ref}>
      <div className='overflow-hidden lg:h-52'>
        <Link
          className='block transition-all duration-300 hover:scale-110'
          to='/front/lesson/show'>
          <LazyLoadImage src={src} alt='' effect='blur' />
        </Link>
      </div>
      <div className='p-3'>
        <Link className='mb-2 font-bold' to='/front/lesson/show'>
          {Random.csentence(10, 20)}
        </Link>
        <div className='text-sm'>{Random.csentence(20, 80)}</div>
      </div>
    </div>
  )
})
