export type CardItem = {
  tier: string; // 计划名称
  most_popular?: boolean; // 是否为最受欢迎
  amount_per_month: number; // 每月金额
  title: string; // 标题
  description: string; // 描述
  btn_text: string; // 按钮文本
  features: {
    title: string; // 特性标题
    checked: boolean; // 是否选中
  }[];
};
