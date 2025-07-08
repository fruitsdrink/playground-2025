import { redirect } from "next/navigation";
import { signInPath } from "@/paths";
import { getAuth } from "./get-auth";

export async function getAuthRedirect() {
  const auth = await getAuth();
  if (!auth.user) {
    redirect(signInPath());
  }

  return auth;
}
