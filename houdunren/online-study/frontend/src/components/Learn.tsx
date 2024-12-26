import { Card } from 'antd'
import { LearnItem } from './LearnItem'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Learn = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <Card title='学习动态' className={className} {...rest} ref={ref}>
        <div className='grid grid-flow-row gap-4'>
          {[...Array(10)].map((_, index) => (
            <LearnItem key={index} />
          ))}
        </div>
      </Card>
    )
  },
)
