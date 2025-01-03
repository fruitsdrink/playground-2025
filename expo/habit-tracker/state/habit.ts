import { habitColors } from "@/constants/Colors";
import { observable } from "@legendapp/state";

const initialValues = {
  name: "",
  description: "",
  color: habitColors[0],
};
export const newHabit$ = observable({
  ...initialValues,
  canAddHabit: () => {
    return newHabit$.name.get().length > 3 && !!newHabit$.color.get();
  },
  clear: () => {
    newHabit$.assign(initialValues);
  },
});
