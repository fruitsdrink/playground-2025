import { FileRoutesByPath } from '@tanstack/react-router'

// 写法1
// type RoutePath<T> = {
//   [K in keyof T]: T[K] extends { fullPath: infer P } ? P : never
// }[keyof T]

// export type MenuType = { title: string; to: RoutePath<FileRoutesByPath> }

// 写法2
// type MenuType<T> = {
//   [K in keyof T]: T[K] extends { fullPath: infer P } ? { title: string; to: P } : never
// }[keyof T]

// 写法3
type MenuType<T, F extends keyof T[keyof T]> = {
  title: string
  to: T[keyof T][F]
}

const menus: MenuType<FileRoutesByPath, 'fullPath'>[] = [
  {
    title: '系统课程',
    to: '/front/chapter/system',
  },
  {
    title: '实战项目',
    to: '/front/chapter/project',
  },
  {
    title: '碎片课程',
    to: '/front/lesson',
  },
  {
    title: '最近更新',
    to: '/front/video',
  },
  {
    title: '话题讨论',
    to: '/front/topic',
  },
  {
    title: '订阅优惠',
    to: '/front/subscribe',
  },
  {
    title: '签到打卡',
    to: '/front/sign',
  },
  {
    title: '在线文档',
    to: '/',
  },
]

export default menus
