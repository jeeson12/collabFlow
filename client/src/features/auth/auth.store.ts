import { create } from "zustand";
import { User } from "./type";

interface authState {
  token: string | null;
  user: User | null;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;

  logout: () => void;
}

export const useAuthStore = create<authState>((set) => ({
  token: null,
  user: null,
  setToken: (token: string | null) => set({ token }),
  setUser: (user: User | null) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));
