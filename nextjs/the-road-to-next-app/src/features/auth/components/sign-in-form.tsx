"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/components/field-error";
import { Form } from "@/components/form/components/form";
import { SubmitButton } from "@/components/form/components/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";

export function SignInForm() {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input
        name="email"
        placeholder="Email"
        defaultValue={actionState.payload?.get("email") as string}
      />
      <FieldError name="email" actionState={actionState} />

      <Input
        name="password"
        placeholder="Password"
        type="password"
        autoComplete="off"
        defaultValue={actionState.payload?.get("password") as string}
      />
      <FieldError name="password" actionState={actionState} />

      <SubmitButton label="Sign In" />
    </Form>
  );
}
