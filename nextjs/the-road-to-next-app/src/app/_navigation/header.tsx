"use client";

import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { homePath, signInPath, signUpPath } from "@/paths";
import { ThemeSwitcher } from "../../components/theme/theme-switcher";
import { Button, buttonVariants } from "../../components/ui/button";
import { AccountDropdown } from "./account-dropdown";

export function Header() {
  const { user, isFetched } = useAuth();

  if (!isFetched) {
    return null;
  }

  const navItems = user ? (
    <AccountDropdown user={user} />
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
    <nav
      className={cn(
        "animate-header-from-top",
        "fixed left-0 top-0 right-0 w-full z-20 border-b flex items-center justify-between py-2.5 px-5 bg-background/55 backdrop-blur-sm supports-backdrop-blur:bg-background/60"
      )}
    >
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
