import { Card } from 'antd'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Tip = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <Card title='社区小贴' className={className} {...rest} ref={ref}>
        <div className='text-base leading-7 text-center'>
          后盾人是一个主张友好、分享、自由的技术交流社区。
          <br />
          请记住我们的口号
          <br />
          <div className='font-bold text-amber-600'>后盾人 人人做后盾</div>
        </div>
      </Card>
    )
  },
)
