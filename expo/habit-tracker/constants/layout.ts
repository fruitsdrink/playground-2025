import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const _spacing = 4;
export const _buttonHeight = 44;
const _itemsPerRow = 15;
export const _habitLogsSize =
  (width - (_itemsPerRow + 1) * _spacing) / _itemsPerRow;
