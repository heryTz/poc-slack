import { useQuery } from "react-query";
import { UsersService } from "src/api-sdk";

export function useListUser() {
  return useQuery("list_user", () => UsersService.find());
}
