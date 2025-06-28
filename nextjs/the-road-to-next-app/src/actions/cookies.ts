"use server";

import { cookies } from "next/headers";

export async function setCookieByKey(
  key: string,
  value: string,
  options?: { expires?: Date }
) {
  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    expires: options?.expires,
  });
}

export async function getCookieByKey(key: string) {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(key);
  return cookie ? cookie.value : null;
}

export async function deleteCookieByKey(Key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(Key);
}
