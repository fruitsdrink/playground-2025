import type { Href } from "expo-router";
import type { ImageSourcePropType } from "react-native";

export type Post = {
  id: string;
  title: string;
  desc?: string;
  href: Href;
  date: string;
  image?: ImageSourcePropType;
  video?: number;
  imageSizeType?: "horizontal" | "vertical";
  github?: Href;
  youtube?: Href;
  bilibili?: Href;
  tags?: string[];
  isTop?: boolean;
};

export const posts: Post[] = [
  {
    id: "1",
    title: "分页指示器引导页",
    href: "/animation/onboarding-pagination-indicator",
    date: "2024-11-25",
    imageSizeType: "vertical",
    video: require("@assets/videos/cover/animation/onboarding-pagination-indicator.mp4"),
    github: "https://github.com/fruitsdrink/rn-onboarding-component-",
    youtube: "https://youtu.be/m8ATJwrAif0",
    tags: ["动画", "reanimated", "onboarding", "轮播图"]
  },
  {
    id: "2",
    title: "Reanimated练习",
    desc: "Reanimated 系列基础练习",
    href: "/animation/reanimated-tutorial",
    date: "2024-11-26",
    image: require("@assets/images/cover/reanimated.png"),
    youtube: "https://youtu.be/bP72HF-G4aQ",
    tags: ["动画", "reanimated"],
    isTop: false
  },
  {
    id: "3",
    title: "Reanimated轮播图",
    href: "/animation/reanimated-carousel",
    date: "2024-11-27",
    video: require("@assets/videos/cover/animation/reanimated-carousel.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/LflZJ4sY5Pw",
    tags: ["动画", "reanimated", "轮播图"]
  },
  {
    id: "4",
    title: "循环轮播图",
    href: "/animation/reanimated-slider",
    date: "2024-11-29",
    video: require("@assets/videos/cover/animation/reanimated-slider.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/wIh60UQzUKY",
    tags: ["FlatList", "动画", "reanimated", "轮播图"]
  },
  {
    id: "5",
    title: "引导屏01",
    href: "/onboarding-screen/onboarding-screen-01/onboarding",
    date: "2024-11-30",
    video: require("@assets/videos/cover/onboarding-screen/onboarding-screen-01.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/7ZkwC8NKPzM",
    tags: ["引导屏", "onboarding", "FlatList"]
  },
  {
    id: "6",
    title: "引导屏02",
    href: "/onboarding-screen/onboarding-screen-02",
    date: "2024-11-30",
    video: require("@assets/videos/cover/onboarding-screen/onboarding-screen-02.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/0eWe01XPM40",
    tags: ["引导屏", "onboarding", "FlatList"]
  },
  {
    id: "7",
    title: "引导屏03",
    href: "/onboarding-screen/onboarding-screen-03",
    date: "2024-11-30",
    video: require("@assets/videos/cover/onboarding-screen/onboarding-screen-03.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/1XP28xVToho",
    tags: ["引导屏", "onboarding", "原生动画", "ScrollView", "动画"]
  },
  {
    id: "8",
    title: "引导屏04",
    href: "/onboarding-screen/onboarding-screen-04",
    date: "2024-12-01",
    video: require("@assets/videos/cover/onboarding-screen/onboarding-screen-04.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/OT-73hpwxXQ",
    tags: ["引导屏", "onboarding", "reanimated", "动画", "ScrollView"]
  },
  {
    id: "9",
    title: "引导屏05",
    href: "/onboarding-screen/onboarding-screen-05",
    date: "2024-12-01",
    video: require("@assets/videos/cover/onboarding-screen/onboarding-screen-05.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/YE7c6ch2msY",
    tags: ["引导屏", "onboarding", "原生动画", "动画", "FlatList"]
  },
  {
    id: "10",
    title: "引导屏06",
    href: "/onboarding-screen/onboarding-screen-06",
    date: "2024-12-01",
    video: require("@assets/videos/cover/onboarding-screen/onboarding-screen-06.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/XHFND34Tx9g",
    tags: ["引导屏", "onboarding", "FlatList"]
  },
  {
    id: "11",
    title: "视差轮播图",
    href: "/animation/reanimated-wallpaper-carousel",
    date: "2024-12-01",
    video: require("@assets/videos/cover/animation/reanimated-wallpaper-carousel.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/qaGRabISXwI",
    tags: ["视差", "轮播图", "TanStack Query", "FlatList", "reanimated"]
  },
  {
    id: "12",
    title: "FlatList动画",
    href: "/animation/animated-flatlist",
    date: "2024-12-02",
    video: require("@assets/videos/cover/animation/animated-flatlist.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/F8x-dyIsrJ8",
    tags: ["FlatList", "原生动画", "动画"]
  },
  {
    id: "13",
    title: "视差轮播图2",
    href: "/animation/reanimated-wallpaper-carousel2",
    date: "2024-12-02",
    video: require("@assets/videos/cover/animation/reanimated-wallpaper-carousel2.mp4"),
    imageSizeType: "vertical",
    youtube: "https://www.youtube.com/live/8Saxitk5IWg",
    tags: ["视差", "轮播图", "TanStack Query", "FlatList", "reanimated"]
  },
  {
    id: "14",
    title: "TikTok消息动画",
    href: "/animation/tiktok-incoming-message",
    date: "2024-12-02",
    video: require("@assets/videos/cover/animation/tiktok-incoming-message.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/dFUaYZ_AXcc",
    tags: ["FlatList", "reanimated", "SegmentedControl", "动画"]
  },
  {
    id: "15",
    title: "竖向列表动画",
    href: "/animation/reanimated-vertical-list",
    date: "2024-12-03",
    video: require("@assets/videos/cover/animation/reanimated-vertical-list.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/dFUaYZ_AXcc",
    tags: ["FlatList", "reanimated", "动画"]
  },
  {
    id: "16",
    title: "布局动画",
    href: "/animation/reanimated-layout",
    date: "2024-12-03",
    video: require("@assets/videos/cover/animation/reanimated-layout.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/tROYCoYpO58",
    tags: ["FlatList", "reanimated", "动画", "Moti"]
  },
  {
    id: "17",
    title: "TeslaClone",
    href: "/not-just/tesla-clone",
    date: "2024-12-04",
    video: require("@assets/videos/cover/not-just/tesla-clone.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/iQ_0Fd_N3Mk",
    tags: ["NotJust", "FlatList"]
  },
  {
    id: "18",
    title: "Tabbar动画01",
    href: "/tabbar/tabbar01",
    date: "2024-12-04",
    video: require("@assets/videos/cover/tabbar/tabbar01.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/GrLCS5ww030",
    tags: ["Tabbar", "动画", "reanimated"]
  },
  {
    id: "19",
    title: "顶部Tabs动画",
    href: "/animation/reanimated-top-tabs",
    date: "2024-12-05",
    video: require("@assets/videos/cover/animation/reanimated-top-tabs.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/zBBMimH6lTc",
    tags: ["Tabbar", "动画", "reanimated", "LucideIcon", "动态组件"]
  },
  {
    id: "20",
    title: "计数器动画",
    href: "/animation/reanimated-counter",
    date: "2024-12-05",
    video: require("@assets/videos/cover/animation/reanimated-counter.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/Rv91NdVtnsw",
    tags: ["动画", "reanimated", "LucideIcon", "动态组件", "数字"]
  },
  {
    id: "21",
    title: "排行榜动画",
    href: "/animation/reanimated-leaderboard",
    date: "2024-12-06",
    video: require("@assets/videos/cover/animation/reanimated-leaderboard.mp4"),
    imageSizeType: "vertical",
    youtube: "https://youtu.be/ycnnhfHO8wU",
    tags: ["动画", "reanimated"]
  },
  {
    id: "22",
    title: "文本动画",
    href: "/animation/reanimated-sentence",
    date: "2024-12-06",
    video: require("@assets/videos/cover/animation/reanimated-sentence.mp4"),
    imageSizeType: "vertical",
    youtube: "https://www.youtube.com/live/-YjeQ9zvM3E",
    tags: ["动画", "reanimated", "文字"]
  },
  {
    id: "23",
    title: "手风琴下拉组件",
    href: "/animation/reanimated-accordion",
    date: "2024-12-08",
    video: require("@assets/videos/cover/animation/reanimated-accordion.mp4"),
    imageSizeType: "vertical",
    youtube: "https://www.youtube.com/live/T-b0gxkW9MM",
    tags: ["动画", "reanimated", "手风琴", "下拉组件"]
  },
  {
    id: "24",
    title: "自定义标签导航",
    href: "/tabbar/tabbar02",
    date: "2024-12-11",
    video: require("@assets/videos/cover/tabbar/tabbar02.mp4"),
    imageSizeType: "vertical",
    bilibili: "https://www.bilibili.com/video/BV1rZHnegEcG",
    tags: ["Tabbar"]
  }
];
