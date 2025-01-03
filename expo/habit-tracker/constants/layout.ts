import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const _spacing = 4;
export const _buttonHeight = 44;
const _itemsPerRow = 15;
export const _habitLogsSize =
  (width - (_itemsPerRow + 1) * _spacing) / _itemsPerRow;

export const screen = { width, height };
export const _borderRadius = 12;
