import { AuthLayout } from '@/layouts/AuthLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Input } from 'antd'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout title='注册' img='/images/auth/register.jpg'>
      <div className='grid grid-flow-row gap-3'>
        <Input placeholder='请输入用户名或邮箱' size='large' />
        <Input placeholder='请输入登录密码' type='password' size='large' />
        <Input placeholder='请再次输入登录密码' type='password' size='large' />
        <Input placeholder='请输入验证码' size='large' />
      </div>
      <div className='mt-3'>
        <Button
          type='primary'
          size='large'
          block
          className='bg-violet-700 hover:!bg-violet-600'>
          注册
        </Button>
      </div>
    </AuthLayout>
  )
}
