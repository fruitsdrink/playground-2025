import { refresAccessToken } from "@/api/auth";
import { setStoredAccessToken } from "@/lib/auth-token";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: AuthContextType["accessToken"]) => void;
  user: { id: string; email: string; name: string } | null;
  setUser: (user: AuthContextType["user"]) => void;
};
const AuthContenxt = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextType["user"] | null>(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const { accessToken: newToken, user } = await refresAccessToken();

        setAccessToken(newToken);
        setUser(user);

        setStoredAccessToken(newToken);
      } catch (err) {
        console.error("Failed to refresh token", err);
      }
    };

    loadAuth();
  }, []);

  useEffect(() => {
    setStoredAccessToken(accessToken);
  }, [accessToken]);

  return (
    <AuthContenxt.Provider
      value={{ accessToken, setAccessToken, user, setUser }}
    >
      {children}
    </AuthContenxt.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContenxt);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
