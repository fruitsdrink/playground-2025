import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
  payload?: FormData;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now(),
};
export function fromErrorToActionState(
  error: unknown,
  formData?: FormData
): ActionState {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now(),
    };
  }
  return {
    status: "ERROR",
    message: "An unknown error occurred",
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now(),
  };
}

export const toActionState = (
  status: ActionState["status"],
  message: string
): ActionState => ({
  status,
  message,
  fieldErrors: {},
  timestamp: Date.now(),
});
