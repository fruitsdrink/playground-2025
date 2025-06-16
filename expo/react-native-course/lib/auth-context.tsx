import React, { createContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoadingUser: boolean;
  signUp: (email: string, password: string) => Promise<string | null>;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error("获取用户信息失败:", error);
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  };

  const signUp = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password); // Automatically sign in after successful sign up
      return null;
    } catch (error) {
      console.error("Sign up error:", error);
      if (error instanceof Error) {
        return error.message; // Return the error message if it's an instance of Error
      }
      return "注册失败，请稍后再试"; // Fallback error message
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<string | null> => {
    try {
      await account.createEmailPasswordSession(email, password);
      // 防止appwrite免费用户的频率限制
      setTimeout(async () => {
        await getUser();
      }, 10);
      return null;
    } catch (error) {
      console.error("Sign in error:", error);
      if (error instanceof Error) {
        return error.message; // Return the error message if it's an instance of Error
      }
      return "登录失败，请稍后再试"; // Fallback error message
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
