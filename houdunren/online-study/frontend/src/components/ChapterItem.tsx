import { Link } from '@tanstack/react-router'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  title: string
  description: string
}

export const ChapterItem = React.forwardRef<HTMLDivElement, Props>(
  ({ src, title, description }, ref) => {
    return (
      <div className='overflow-hidden rounded-lg border cursor-pointer' ref={ref}>
        <div className='overflow-hidden h-60'>
          <Link className='block duration-300 hover:scale-110' to='/front/chapter/show'>
            <LazyLoadImage src={src} alt='' effect='blur' />
          </Link>
        </div>
        <div className='p-3'>
          <Link className='mb-2 font-bold' to='/front/chapter/show'>
            {title}
          </Link>
          <div className='text-sm'>{description}</div>
        </div>
      </div>
    )
  },
)
