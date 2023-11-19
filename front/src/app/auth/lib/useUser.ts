import { useAuth } from "./useAuth";

export function useUser() {
  const { user } = useAuth();
  if (!user)
    throw Error(`"useUser" should called inside an authenticated component`);

  return { user };
}
