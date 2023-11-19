import { Outlet } from "react-router";
import { ChannelMenu } from "../menu";
import { IconButton } from "../button";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Badge } from "../badge";
import { ColumnLayout } from ".";

export function ChannelLayout() {
  return (
    <div className="grid grid-cols-[300px_1fr] ">
      <ColumnLayout
        title="Hery Nirintsoa"
        toolbar={<IconButton Element={PencilSquareIcon} />}
        className="bg-slate-50"
        appBarClassName="!bg-slate-50"
        contentClassName="gap-4 p-6 flex-1"
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
