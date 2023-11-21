import { SidebarMenu } from "src/components/menu";
import { useChannels } from "../lib/channel.query";
import { useLocation } from "react-router-dom";

export function ChannelMenu() {
  const { pathname } = useLocation();
  const { data, isLoading } = useChannels();
  const channels = data ?? [];

  return (
    <SidebarMenu
      loading={isLoading}
      title="Canaux"
      links={channels.map((el) => ({
        label: el.name,
        path: `/channel/${el.id}`,
        active: pathname.includes(`/channel/${el.id}`),
      }))}
      footer={{
        label: "Ajouter des cannaux",
        onClick: () => {},
      }}
    />
  );
}
