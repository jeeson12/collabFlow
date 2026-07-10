import { create } from "zustand";
import { User } from "./auth.type";

interface authState {
  user: User | null;

  setUser: (user: User | null) => void;

  logout: () => void;
}

export const useAuthStore = create<authState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  logout: () => set({ user: null }),
}));
