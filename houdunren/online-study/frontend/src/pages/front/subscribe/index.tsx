import { Pay } from '@/components/Pay'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/front/subscribe/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main>
      <section
        style={{
          backgroundImage: 'linear-gradient(150deg,rgb(45,21,130), rgb(25,160,255))',
        }}
        className='flex flex-col justify-center items-center -mt-6 text-white'>
        <div className='mt-24 text-4xl font-bold lg:text-8xl'>投资学习是值得的</div>
        <div className='mt-6 mb-48 text-2xl font-light leading-10 text-center opacity-80'>
          学习网站所有课程，并提供高清版视频下载
          <br />
          免费提供 教程案例 下载学习使用
        </div>
      </section>

      <Pay />

      <section className='mt-12 font-bold text-center'>
        随着课程不断增加，订阅价格会有涨幅，越早订阅越划算
        <div className='mt-3 font-normal leading-8 text-center'>
          视频属于虚拟物品，购买后不支持退款，支付的费用仅用于观看视频，并不包含其他服务（如在线解答）
          <br />
          有问题发到网站，热心的盾友会帮助你，也可以加入微信群与志同道合的朋友一起学习
          <br />
          祝你学习愉快
        </div>
      </section>
    </main>
  )
}
