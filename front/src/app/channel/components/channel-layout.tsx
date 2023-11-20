import { Outlet, Navigate, useLocation } from "react-router";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { AuthStatus, useAuth } from "src/app/auth/lib/useAuth";
import { Spin } from "src/components/loader";
import { ColumnLayout } from "src/components/layouts";
import { IconButton } from "src/components/button";
import { ChannelMenu } from "src/components/menu";
import { useUser } from "src/app/auth/lib/useUser";
import { useSocketConnection } from "src/lib/useSocket";
import { useChannels } from "../lib/channel.query";
import { useListUser } from "src/app/user/lib/user.query";

function ChannelLayoutComponent() {
  const { pathname } = useLocation();
  const { logout, token } = useAuth();
  const { user } = useUser();
  const { data: channelsData, isLoading: loadingChannels } = useChannels();
  const { data: listUserData, isLoading: listUserLoading } = useListUser();

  useSocketConnection({ url: import.meta.env.VITE_WS_URL, token });

  const channels = channelsData ?? [];
  const users = listUserData ?? [];

  return (
    <div className="grid grid-cols-[300px_1fr] ">
      <ColumnLayout
        title={user.name}
        toolbar={<IconButton Element={PencilSquareIcon} />}
        className="bg-slate-50"
        appBarClassName="!bg-slate-50"
        contentClassName="gap-4 p-6 flex-1"
        titleMenus={[
          {
            label: "Déconnexion",
            onClick: logout,
          },
        ]}
      >
        <div className="flex flex-col gap-6">
          <ChannelMenu
            loading={loadingChannels}
            title="Canaux"
            links={channels.map((el) => ({
              label: el.name,
              path: `/channel/${el.id}`,
              active: pathname.includes(`/channel/${el.id}`),
            }))}
            // footer={{
            //   label: "Ajouter des cannaux",
            //   onClick: () => {},
            // }}
          />
          <ChannelMenu
            loading={listUserLoading}
            title="Messages directs"
            links={users.map((el) => ({
              label: el.name,
              path: `/message/${el.id}`,
              active: pathname.includes(`/message/${el.id}`),
            }))}
          />
        </div>
      </ColumnLayout>
      <div className="border-l border-l-slate-50 shadow-lg relative z-20">
        <Outlet />
      </div>
      {/* <div className="border-l border-slate-50 shadow-xl"></div> */}
    </div>
  );
}

export function ChannelLayout() {
  const { status } = useAuth();
  if (status === AuthStatus.Unknown)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spin className="!text-blue-800 w-6 h-6" />
      </div>
    );

  if (status === AuthStatus.Guest)
    return <Navigate to="/auth/signin" replace />;

  return <ChannelLayoutComponent />;
}
