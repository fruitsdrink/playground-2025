"use server";

import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { luciaV3 } from "@/lib/lucia-v3";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/paths";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces"
      ),
    email: z.string().min(1, { message: "Is required" }).max(191).email(),
    password: z.string().min(6).max(191),
    confirmPassword: z.string().min(6).max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export async function signUp(_actionState: ActionState, formData: FormData) {
  try {
    const { username, email, password } = signUpSchema.parse(
      Object.fromEntries(formData)
    );

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return toActionState("ERROR", "User already exists");
    }

    const passwordHash = await hash(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    const session = await luciaV3.createSession(user.id, {});
    const sessionCookie = luciaV3.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(sessionCookie.name, sessionCookie.value, {
      ...sessionCookie.attributes,
      httpOnly: true,
    });
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  redirect(ticketsPath());
}
