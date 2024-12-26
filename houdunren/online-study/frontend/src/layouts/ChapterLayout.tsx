import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
}

export const ChapterLayout = React.forwardRef<HTMLDivElement, Props>(
  ({ title, description, children }, ref) => {
    return (
      <main className='p-6 mx-3 bg-white rounded-lg lg:container' ref={ref}>
        <h1 className='mt-12 text-3xl font-bold text-center'>{title}</h1>
        <div className='mt-6 text-center'>{description}</div>

        <section className='grid gap-6 mt-16 md:grid-cols-2 lg:grid-cols-3'>
          {children}
        </section>
      </main>
    )
  },
)
