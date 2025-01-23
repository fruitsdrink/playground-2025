import { Dimensions, Insets } from "react-native";

const { width, height } = Dimensions.get("window");
export const _spacing = 4;
export const _buttonHeight = 44;
export const _buttonIconSize = 32;
const _itemsPerRow = 15;
export const _habitLogsSize =
  (width - (_itemsPerRow + 1) * _spacing) / _itemsPerRow;

export const screen = { width, height };
export const _borderRadius = 12;
export const _hitslop: Insets = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};
