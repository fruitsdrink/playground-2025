import React from "react";
import { toast } from "sonner";
import { useActionFeedback } from "../hooks/use-action-feedback";
import { ActionState } from "../utils/to-action-state";

type FromProps = {
  action: (formData: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};
export function Form({
  action,
  actionState,
  children,
  onSuccess,
  onError,
}: FromProps) {
  useActionFeedback(actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }
      onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      onError?.(actionState);
    },
  });

  return (
    <form action={action} className="flex flex-col gap-y-4">
      {children}
    </form>
  );
}
