import { AuthLayout } from '@/layouts/AuthLayout'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Input } from 'antd'

export const Route = createFileRoute('/auth/forget')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout title='找回密码' img='/images/auth/forget-password.jpg'>
      <div className='grid grid-flow-row gap-3'>
        <Input placeholder='请输入邮箱或手机号' size='large' />
        <Input placeholder='请输入验证码' size='large' />
        <Input placeholder='请输入新密码' type='password' size='large' />
        <Input placeholder='请再次输入新密码' type='password' size='large' />
      </div>
      <div className='mt-3'>
        <Button
          type='primary'
          size='large'
          block
          className='bg-violet-700 hover:!bg-violet-600'>
          确认
        </Button>
      </div>
    </AuthLayout>
  )
}
