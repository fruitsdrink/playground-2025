import { icons } from "lucide-react-native";
import iconIcons from "lucide-static/icon-nodes.json";
import { toPascalCase } from "./lucide-utils";

export type LucideIconName = keyof typeof icons;
export const habitIcons: LucideIconName[] = [
  "CircleCheck",
  "Calendar",
  "Clock",
  "Heart",
  "Star",
  "Activity",
  "Book",
  "Pen",
  "Music",
  "Music2",
  "Music4",
  "Coffee",
  "Moon",
  "Sun",
  "Smile",
  "Leaf",
  "Bell",
  "Droplet",
  "ShoppingBag",
  "ShoppingCart",
  "Code",
  "Paintbrush",
  "PaintbrushVertical",
  "Film",
  "Zap",
  "Bike",
  "Car",
  "Camera",
  "Gift",
  "Umbrella",
  "Clipboard",
  "Flame",
];
export const iconsList = Object.keys(iconIcons).map((icon) =>
  toPascalCase(icon)
) as LucideIconName[];
