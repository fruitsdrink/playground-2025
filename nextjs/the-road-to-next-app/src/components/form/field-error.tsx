import { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};
export function FieldError({ actionState, name }: FieldErrorProps) {
  const errors = actionState.fieldErrors[name];

  if (!errors || errors.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      {errors.map((error, index) => (
        <span key={index} className="text-xs text-red-500">
          {error}
        </span>
      ))}
    </div>
  );
}
