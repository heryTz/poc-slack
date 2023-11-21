import { useListUser } from "src/app/user/lib/user.query";
import { useLocation } from "react-router-dom";
import { SidebarMenu } from "src/components/menu";

export function DirectMessageMenu() {
  const { pathname } = useLocation();
  const { data, isLoading } = useListUser();
  const users = data ?? [];

  return (
    <SidebarMenu
      loading={isLoading}
      title="Messages directs"
      links={users.map((el) => ({
        label: el.name,
        path: `/message/${el.id}`,
        active: pathname.includes(`/message/${el.id}`),
      }))}
    />
  );
}
