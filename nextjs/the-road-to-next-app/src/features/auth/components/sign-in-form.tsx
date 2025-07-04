"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signIn } from "../actions/sign-in";

export function SignInForm() {
  const [actionState, action] = useActionState(signIn, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input name="email" placeholder="Email" />
      <FieldError name="email" actionState={actionState} />

      <Input name="password" placeholder="Password" type="password" />
      <FieldError name="password" actionState={actionState} />

      <SubmitButton label="Sign In" />
    </Form>
  );
}
