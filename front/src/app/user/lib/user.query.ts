import { useQuery } from "react-query";
import { UsersService } from "src/api-sdk";

export function useListUser() {
  return useQuery("list_user", () => UsersService.find());
}

type GetUserByIdOptions = {
  id: number;
  disabled?: boolean;
};

export function useGetUserById({ id, disabled }: GetUserByIdOptions) {
  return useQuery(["get_user_by_id", id], {
    enabled: !disabled,
    queryFn: () => UsersService.findOne({ id }),
  });
}
