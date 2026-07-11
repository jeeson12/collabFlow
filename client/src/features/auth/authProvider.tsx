"use client";
import { createContext, ReactNode, useContext } from "react";
import { User } from "./type";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "./api";

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
