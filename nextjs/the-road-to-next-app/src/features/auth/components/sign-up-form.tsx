"use client";

import { useActionState } from "react";
import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import { EMPTY_ACTION_STATE } from "@/components/form/utils/to-action-state";
import { Input } from "@/components/ui/input";
import { signUp } from "../actions/sign-up";

export function SignUpForm() {
  const [actionState, action] = useActionState(signUp, EMPTY_ACTION_STATE);
  return (
    <Form action={action} actionState={actionState}>
      <Input name="username" placeholder="Username" />
      <FieldError name="username" actionState={actionState} />

      <Input name="email" placeholder="Email" />
      <FieldError name="email" actionState={actionState} />

      <Input name="password" placeholder="Password" type="password" />
      <FieldError name="password" actionState={actionState} />

      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
        type="password"
      />
      <FieldError name="confirmPassword" actionState={actionState} />

      <SubmitButton label="Sign Up" />
    </Form>
  );
}
