import { Diamond } from '@icon-park/react'
import { Button } from 'antd'
import classNames from 'classnames'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const Pay = React.forwardRef<HTMLDivElement, Props>(
  ({ className, ...rest }, ref) => {
    return (
      <section
        className={classNames('flex justify-center -mt-32', className)}
        {...rest}
        ref={ref}>
        <div className='flex flex-col items-center px-20 py-12 text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-lg jucstify-center'>
          <div className='mb-3 text-white'>
            <Diamond theme='outline' size='120' strokeWidth={3} />
          </div>
          <div className='mb-6 text-3xl font-bold'>永恒钻石</div>
          <div className='font-light opacity-80'>可以学习全部课程</div>
          <div className='mt-6 text-3xl font-bold'>199元</div>
          <div className='flex gap-3 mt-6'>
            <Button
              type='primary'
              className='bg-green-600 hover:!bg-green-500 shadow-lg'
              size='large'>
              微信支付
            </Button>
            <Button
              type='primary'
              className='bg-blue-600 hover:!bg-blue-500 shadow-lg'
              size='large'>
              支付宝付款
            </Button>
          </div>
        </div>
      </section>
    )
  },
)
