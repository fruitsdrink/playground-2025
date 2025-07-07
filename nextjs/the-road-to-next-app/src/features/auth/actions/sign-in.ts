"use server";

import { verify } from "@node-rs/argon2";
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

const signInSchema = z.object({
  email: z.string().min(1, { message: "Is required" }).max(191).email(),
  password: z.string().min(6).max(191),
});

export async function signIn(_actionState: ActionState, formData: FormData) {
  try {
    const { email, password } = signInSchema.parse(
      Object.fromEntries(formData)
    );

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }
    const validPassword = await verify(user.passwordHash, password);
    if (!validPassword) {
      return toActionState("ERROR", "Incorrect email or password", formData);
    }

    const session = await luciaV3.createSession(user.id, {});
    // const session = await lucia.createSession({ userId: user.id });
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
