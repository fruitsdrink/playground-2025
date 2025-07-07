"use client";

import { LucideKanban, LucideLogOut } from "lucide-react";
import Link from "next/link";
import { signOut } from "@/features/auth/actions/sign-out";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { homePath, signInPath, signUpPath, ticketsPath } from "@/paths";
import { SubmitButton } from "./form/submit-button";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button, buttonVariants } from "./ui/button";

export function Header() {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <>
      <Link
        href={ticketsPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Tickets
      </Link>
      <form action={signOut}>
        <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
      </form>
    </>
  ) : (
    <>
      <Link
        href={signUpPath()}
        className={buttonVariants({ variant: "outline" })}
      >
        Sign Up
      </Link>
      <Link
        href={signInPath()}
        className={buttonVariants({ variant: "default" })}
      >
        Sign In
      </Link>
    </>
  );

  return (
    <nav className=" animate-header-from-top  fixed left-0 top-0 right-0 w-full z-20 border-b flex items-center justify-between py-2.5 px-5 bg-background/55 backdrop-blur-sm supports-backdrop-blur:bg-background/60">
      <div className="flex align-middle gap-x-2">
        <Button asChild variant={"ghost"}>
          <Link href={homePath()}>
            <LucideKanban />
            <h1 className="text-lg font-semibold">TicketBounty</h1>
          </Link>
        </Button>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeSwitcher />
        {navItems}
      </div>
    </nav>
  );
}
