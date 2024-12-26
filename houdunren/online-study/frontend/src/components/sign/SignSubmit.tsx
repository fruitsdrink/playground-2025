import emoji from '@/config/emoji'
import { Remind } from '@icon-park/react'
import { Button, Card, Input } from 'antd'

export const SignSubmit = () => {
  return (
    <Card title='签到快乐，再接再厉'>
      <div className='space-y-3'>
        <Input placeholder='你今天的心情' size='large' />
        <Input placeholder='验证码' size='large' />
      </div>

      <div className='flex flex-wrap gap-3 items-center mt-6'>
        {emoji.map((item, index) => {
          return (
            <div
              key={index}
              className='overflow-hidden p-1 rounded-xl border-4 duration-300 cursor-pointer hover:border-rose-600'>
              <img src={`/images/emoji/${item}.gif`} alt='' className='h-full' />
            </div>
          )
        })}
      </div>

      <div className='flex gap-3 items-center p-3 mt-6 rounded-lg bg-slate-100'>
        <Button type='primary'>开始签到</Button>
        <div className='flex gap-1 items-center'>
          <Remind theme='outline' size='24' />
          <div className='opacity-80 text-slate-700'>无意义的灌水内容会被删除</div>
        </div>
      </div>
    </Card>
  )
}
