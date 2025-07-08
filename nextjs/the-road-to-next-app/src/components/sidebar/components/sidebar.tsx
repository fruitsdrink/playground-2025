"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/lib/utils";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-item";

export function Sidebar() {
  const { user, isFetched } = useAuth();
  const [isTransition, setIsTransition] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => {
      setIsTransition(false);
    }, 200); // Match the duration of your transition
  };

  if (!user || !isFetched) {
    return null;
  }

  return (
    <nav
      className={cn(
        "animate-sidebar-from-left",
        "h-screen, border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78pxx]"
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.title}
              isOpen={isOpen}
              navItem={navItem}
            />
          ))}
        </nav>
      </div>
    </nav>
  );
}
