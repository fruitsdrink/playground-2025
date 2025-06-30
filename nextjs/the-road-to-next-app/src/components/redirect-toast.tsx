"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { deleteCookieByKey, getCookieByKey } from "@/actions/cookies";

export function RedirectToast() {
  const pathname = usePathname();
  useEffect(() => {
    (async () => {
      const message = await getCookieByKey("toast");
      if (message) {
        toast.success(message);
        deleteCookieByKey("toast");
      }
    })();
  }, [pathname]);

  return null;
}
