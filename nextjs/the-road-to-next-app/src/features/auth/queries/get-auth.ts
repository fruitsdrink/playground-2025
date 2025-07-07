"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { luciaV3 } from "@/lib/lucia-v3";

export const getAuth = cache(async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(luciaV3.sessionCookieName)?.value;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }
  const result = await luciaV3.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = luciaV3.createSessionCookie(result.session.id);
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = luciaV3.createBlankSessionCookie();
      cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // do nothing if used i a RSC
  }

  return result;
});
