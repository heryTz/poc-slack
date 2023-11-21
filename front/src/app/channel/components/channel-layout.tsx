import { Outlet, Navigate } from "react-router";
import { AuthStatus, useAuth } from "src/app/auth/lib/useAuth";
import { Spin } from "src/components/loader";
import { ColumnLayout } from "src/components/layouts";
import { useUser } from "src/app/auth/lib/useUser";
import { useSocketConnection } from "src/lib/useSocket";
import { Text } from "src/components/text";
import { ChannelMenu } from "./channel-menu";
import { DirectMessageMenu } from "./direct-message-menu";

function ChannelLayoutComponent() {
  const { logout } = useAuth();
  const { user } = useUser();

  return (
    <div className="grid grid-cols-[300px_1fr] ">
      <ColumnLayout
        title={user.name}
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
          <ChannelMenu />
          <DirectMessageMenu />
        </div>
      </ColumnLayout>
      <div className="border-l border-l-slate-50 shadow-lg relative z-20">
        <Outlet />
      </div>
    </div>
  );
}

export function ChannelLayout() {
  const { status, token } = useAuth();

  const socket = useSocketConnection({
    url: import.meta.env.VITE_WS_URL,
    token,
  });

  if (status === AuthStatus.Unknown || !socket)
    return (
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-2">
        <Spin className="!text-blue-800 w-6 h-6" />
        {socket === null && <Text>Tentative de connexion</Text>}
      </div>
    );

  if (status === AuthStatus.Guest)
    return <Navigate to="/auth/signin" replace />;

  return <ChannelLayoutComponent />;
}
