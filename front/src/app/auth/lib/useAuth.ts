import { SigninInput, UserResponse, UsersService } from "src/api-sdk";
import { create } from "zustand";
import { useSignin } from "./auth.query";

type UserStore = {
  user: UserResponse | null | undefined;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: UserResponse | null) => void;
  setTokenData: (token: string, refreshToken: string) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  token: null,
  refreshToken: null,
  setUser: (user: UserResponse | null) => set({ user }),
  setTokenData: (token: string, refreshToken: string) =>
    set({ token, refreshToken }),
}));

export enum AuthStatus {
  Unknown = 0,
  Guest = 1,
  Authenticated = 3,
}

export function useAuth() {
  const { user, setUser } = useUserStore();
  const { mutateAsync: signin } = useSignin();

  const getUser = () => {
    UsersService.me()
      .then(setUser)
      .catch(() => setUser(null));
  };

  const login = async (input: SigninInput) => {
    await signin(input);
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
    login,
  };
}
