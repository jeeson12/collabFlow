import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { useAuthStore } from "../auth.store";

export function useLogin() {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation({
    mutationFn: login,
    onSuccess(data) {
      setUser(data);
    },
  });
}
