import { Outlet, Navigate } from "react-router";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { AuthStatus, useAuth } from "src/app/auth/lib/useAuth";
import { Spin } from "src/components/loader";
import { ColumnLayout } from "src/components/layouts";
import { IconButton } from "src/components/button";
import { ChannelMenu } from "src/components/menu";
import { Badge } from "src/components/badge";
import { useUser } from "src/app/auth/lib/useUser";

function ChannelLayoutComponent() {
  const { logout } = useAuth();
  const { user } = useUser();

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
        <ChannelMenu
          title="Canaux"
          links={[
            {
              label: "général",
              path: "#general",
              active: true,
            },
            {
              label: "bugs",
              path: "#bugs",
              endIcon: <Badge label={4} type="danger" />,
            },
            { label: "tech-qa", path: "#tech-qa" },
            { label: "tech-pr", path: "#tech-pr" },
          ]}
          footer={{
            label: "Ajouter des cannaux",
            onClick: () => {},
          }}
        />
        <ChannelMenu
          title="Messages directs"
          links={[
            { label: "John", path: "#john" },
            { label: "Doe", path: "#doe" },
          ]}
        />
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
