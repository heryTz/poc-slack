import { Outlet } from "react-router";
import { ChannelMenu } from "../menu";
import { IconButton } from "../button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Badge } from "../badge";
import { AppBar } from "../appbar";

export function ChannelLayout() {
  return (
    <div className="grid grid-cols-[300px_1fr_400px] ">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <AppBar
          title="Hery Nirintsoa"
          toolbar={<IconButton Element={PencilSquareIcon} />}
        />
        <div className="flex flex-col gap-4 p-6 flex-1">
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
        </div>
      </div>
      <div className="border-l border-slate-50 shadow-lg">
        <Outlet />
      </div>
      <div className="border-l border-slate-50 shadow-xl"></div>
    </div>
  );
}
