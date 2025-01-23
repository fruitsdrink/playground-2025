import { habits } from "@/db/schema";
import { LucideIconName } from "@/utils/icons";
import { icons, LucideProps } from "lucide-react-native";
import React from "react";

type HabitIconProps = LucideProps & { habit: typeof habits.$inferSelect };

export const HabitIcon: React.FC<HabitIconProps> = ({
  habit,
  color = "#000",
  size = 18,
  ...rest
}) => {
  const LucideIcon =
    icons[habit.icon ? (habit.icon as LucideIconName) : "Trophy"];
  return <LucideIcon color={color} size={size} {...rest} />;
};
