import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // key in localStorage
    }
  )
);
