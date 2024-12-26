import { AuthLayout } from '@/layouts/AuthLayout'
import { Wechat } from '@icon-park/react'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Input } from 'antd'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout title='登录' img='/images/auth/login.jpg'>
      <div className='grid grid-flow-row gap-3'>
        <Input placeholder='请输入用户名或邮箱' size='large' />
        <Input placeholder='请输入登录密码' type='password' size='large' />
        <Input placeholder='请输入验证码' size='large' />
      </div>
      <div className='mt-3'>
        <Button
          type='primary'
          size='large'
          block
          className='bg-violet-700 hover:!bg-violet-600'>
          登录
        </Button>
      </div>

      <div className='flex justify-center mt-3 -mb-8'>
        <div className='p-2 bg-green-600 rounded-full'>
          <Wechat theme='outline' size='24' className='text-white' />
        </div>
      </div>
    </AuthLayout>
  )
}
