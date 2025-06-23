import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { homePath, ticketsPath } from "@/paths";
import { ThemeSwitcher } from "./theme/theme-switcher";
import { Button, buttonVariants } from "./ui/button";

export function Header() {
  return (
    <nav className="fixed left-0 top-0 right-0 w-full z-20 border-b flex items-center justify-between py-2.5 px-5 bg-background/55 backdrop-blur-sm supports-backdrop-blur:bg-background/60">
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
        <Link
          href={ticketsPath()}
          className={buttonVariants({ variant: "default" })}
        >
          Tickets
        </Link>
      </div>
    </nav>
  );
}
