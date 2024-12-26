export const Footer = () => {
  return (
    <div className='mt-72'>
      <section className='flex flex-col justify-center items-center border-t'>
        <div className='px-3 py-1 -mt-4 text-sm font-light text-white bg-gradient-to-l from-blue-500 to-purple-600 rounded-lg'>
          后盾人 人人做后盾
        </div>
        <div className='overflow-hidden mt-6 w-64 rounded-lg'>
          <img src='/images/xj.jpeg' alt='' />
        </div>
        <div className='flex gap-2 justify-center mt-6 font-bold'>
          <span>本站编码</span>
          <span className='text-amber-500'>向军大叔</span>
        </div>
        <div className='bg-[#66a085] px-3 py-1 text-white rounded-lg text-sm mt-6'>
          晚8点直播，来直播间聊聊天吧
        </div>
      </section>
      <div className='py-16 mt-16 text-sm leading-7 text-center bg-gray-900 text-slate-200/80'>
        后盾人 人人做后盾 <br />
        邮箱:test@test.com
        <br />
        Copyright © houdunren All Rights Reserved
        <br />
        京ICP备 123456789
      </div>
    </div>
  )
}
