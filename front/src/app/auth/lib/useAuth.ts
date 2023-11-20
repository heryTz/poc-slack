import { UserResponse, UsersService, VerifyOtpInput } from "src/api-sdk";
import { create } from "zustand";
import { useVerityOtp } from "./auth.query";
import { updateAxiosInstance } from "src/app/setup-http";
import { persist } from "zustand/middleware";
import { useSocketStore } from "src/lib/useSocket";

type UserStore = {
  user: UserResponse | null | undefined;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: UserResponse | null) => void;
  setTokenData: (token: string, refreshToken: string) => void;
  reset: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: undefined,
      token: null,
      refreshToken: null,
      setUser: (user: UserResponse | null) => set({ user }),
      setTokenData: (token: string, refreshToken: string) =>
        set({ token, refreshToken }),
      reset: () => set({ user: null, token: null, refreshToken: null }),
    }),
    { name: "user-storage" }
  )
);

export enum AuthStatus {
  Unknown = 0,
  Guest = 1,
  Authenticated = 3,
}

export function useAuth() {
  const { user, setUser, setTokenData, reset, token, refreshToken } =
    useUserStore();
  const { mutateAsync: onVerifyOtp, isLoading: verifyOtpLoading } =
    useVerityOtp();

  const getUser = () => {
    UsersService.me()
      .then(setUser)
      .catch(() => setUser(null));
  };

  const verifyOtp = async (input: VerifyOtpInput) => {
    const resp = await onVerifyOtp(input);
    setUser(resp.data);
    setTokenData(resp.token, resp.refreshToken);
    updateAxiosInstance({
      headers: { Authorization: `Bearer ${resp.token}` },
    });
  };

  const logout = () => {
    reset();
    useSocketStore.getState().socket?.close();
  };

  let status: AuthStatus;
  switch (user) {
    case undefined:
      status = AuthStatus.Unknown;
      break;
    case null:
      status = AuthStatus.Guest;
      break;
    default:
      status = AuthStatus.Authenticated;
      break;
  }

  return {
    status,
    user,
    getUser,
    setUser,
    setTokenData,
    verifyOtp,
    verifyOtpLoading,
    logout,
    token,
    refreshToken,
  };
}
