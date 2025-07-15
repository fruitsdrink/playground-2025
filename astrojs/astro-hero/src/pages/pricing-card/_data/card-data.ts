import type { CardItem } from "./types";

export const cards: CardItem[] = [
  {
    tier: "免费",
    most_popular: false,
    amount_per_month: 0,
    title: "适合个人",
    description: "适合个人使用的免费计划",
    btn_text: "免费使用",
    features: [
      {
        title: "免费计划特性",
        checked: true,
      },
      {
        title: "另一个免费计划特性",
        checked: false,
      },
      {
        title: "更多免费计划特性",
        checked: true,
      },
    ],
  },
  {
    tier: "专业",
    most_popular: true,
    amount_per_month: 29,
    title: "小型团队",
    description: "适合小型团队的专业计划",
    btn_text: "现在加入",
    features: [
      {
        title: "专业计划特性",
        checked: true,
      },
      {
        title: "另一个专业计划特性",
        checked: true,
      },
      {
        title: "更多专业计划特性",
        checked: false,
      },
    ],
  },
  {
    tier: "企业",
    most_popular: false,
    amount_per_month: 99,
    title: "大型企业",
    description: "适合大型企业的全面解决方案",
    btn_text: "开始使用",
    features: [
      {
        title: "企业计划特性",
        checked: true,
      },
      {
        title: "另一个企业计划特性",
        checked: true,
      },
      {
        title: "更多企业计划特性",
        checked: false,
      },
    ],
  },
];
