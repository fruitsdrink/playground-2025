import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  src: string
}
export const UserIcon: React.FC<Props> = ({ className, src }) => {
  return (
    <div
      className={cn(
        'overflow-hidden w-12 h-12 rounded-lg duration-300 cursor-pointer hover:scale-125',
        className,
      )}>
      <LazyLoadImage
        alt={''}
        effect='blur'
        className={cn('object-cover w-12 h-12 rounded-lg', className)}
        wrapperProps={{
          // If you need to, you can tweak the effect transition using the wrapper style.
          style: { transitionDelay: '1s' },
        }}
        src={src}
      />
    </div>
  )
}
