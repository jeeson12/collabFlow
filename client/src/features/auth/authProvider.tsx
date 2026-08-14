"use client";

import { createContext, ReactNode, useContext, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { User } from "./type";
import { getProfile } from "./api";
import { getSocket } from "@/lib/socket";
import { AxiosError } from "axios";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,

    /*
     * Retry temporary network/server failures.
     * Don't retry when the user is genuinely unauthenticated.
     */
    retry: (failureCount, error: any) => {
      const status = error?.response?.status;

      // User is not authenticated.
      if (status === 401) {
        return false;
      }

      // Don't retry normal 4xx errors.
      if (status && status >= 400 && status < 500) {
        return false;
      }

      // Retry network errors / 5xx errors twice.
      return failureCount < 2;
    },

    /*
     * 1 second → 2 seconds
     */
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),

    /*
     * Don't constantly refetch the profile.
     */
    staleTime: 1000 * 60,

    /*
     * Don't refetch every time the user changes browser tabs.
     */
    refetchOnWindowFocus: false,

    /*
     * If the user's internet goes down and comes back,
     * React Query can try again.
     */
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const socket = getSocket();

    const status = (error as AxiosError)?.response?.status;

    /*
     * IMPORTANT:
     *
     * Only treat 401 as "user is logged out".
     *
     * A network error or 500 does NOT mean the user
     * suddenly became unauthenticated.
     */
    if (status === 401) {
      if (socket.connected) {
        socket.disconnect();
      }

      return;
    }

    /*
     * If we have a valid authenticated user,
     * connect the socket.
     */
    if (user) {
      if (!socket.connected) {
        socket.connect();
      }

      return () => {
        socket.disconnect();
      };
    }

    /*
     * No user and no authentication error.
     * Keep socket disconnected.
     */
    if (!user && !isError) {
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [user, isLoading, isError, error]);

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
