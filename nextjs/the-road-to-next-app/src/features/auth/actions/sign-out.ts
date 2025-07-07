"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { luciaV3 } from "@/lib/lucia-v3";
import { signInPath } from "@/paths";
import { getAuth } from "../queries/get-auth";

export async function signOut() {
  const { session } = await getAuth();
  if (!session) {
    redirect(signInPath());
  }

  await luciaV3.validateSession(session.id);
  const sessionCookie = luciaV3.createBlankSessionCookie();
  const cookieStore = await cookies();

  cookieStore.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  redirect(signInPath());
}
