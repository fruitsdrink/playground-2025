import type { User as AuthUser } from "lucia";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth } from "../queries/get-auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    async function fetchUser() {
      const { user } = await getAuth();
      setUser(user);
      setIsFetched(true);
    }
    fetchUser();
  }, [pathname]);

  return {
    user,
    isFetched,
  };
}
