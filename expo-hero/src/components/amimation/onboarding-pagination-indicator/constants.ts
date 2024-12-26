import { LinearTransition } from "react-native-reanimated";

export const _spacing = 8;
export const _buttonHeight = 42;
export const _dotContainer = 24;
export const _dotSize = _dotContainer / 3;
export const _activeDot = "#fff";
export const _inactiveDot = "#aaa";

export const _layoutTransition = LinearTransition.springify()
  .damping(80)
  .stiffness(200);
