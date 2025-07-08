import React from "react";
import { getAuthRedirect } from "@/features/auth/queries/get-auth-redirect";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await getAuthRedirect();
  return <>{children}</>;
}
