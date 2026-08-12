"use client";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { User } from "./type";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";
import { getSocket } from "@/lib/socket";

type authContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<authContextType | null>(null);

type authProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: authProviderProps) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  useEffect(() => {
    if (!user) {
      getSocket().disconnect();
      return;
    }

    getSocket().connect();

    return () => {
      getSocket().disconnect();
    };
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
