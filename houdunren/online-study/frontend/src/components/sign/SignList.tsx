import { Card, Table } from 'antd'
import React from 'react'

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]

const columns = [
  {
    title: '签到的朋友',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '签到时间',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '月签到天数',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '总签到天数',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '签到心情',
    dataIndex: 'address',
    key: 'address',
  },
]

export const SignList = () => {
  return (
    <Card title='日签到排行' className='mt-3'>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        bordered
        scroll={{ x: 1000 }}
      />
    </Card>
  )
}
