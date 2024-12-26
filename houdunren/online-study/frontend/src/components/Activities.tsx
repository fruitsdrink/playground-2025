import { Card, Pagination } from 'antd'
import { ActivityItem } from './ActivityItem'

export const Activities = () => {
  return (
    <div>
      <Card title='网站动态'>
        <div className='grid grid-flow-row gap-4'>
          {[...Array(10)].map((_, index) => (
            <ActivityItem key={index} />
          ))}
        </div>
      </Card>
      <div className='px-6 py-4 mt-3 bg-white rounded-lg'>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  )
}
