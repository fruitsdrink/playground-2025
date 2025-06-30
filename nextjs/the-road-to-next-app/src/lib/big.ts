import Big from "big.js";

Big.DP = 2; // 设置小数点后两位
Big.RM = Big.roundHalfEven; // 设置舍入模式为四舍五入

export const MyBig = Big;
