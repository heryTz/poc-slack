import { PlusIcon } from "@heroicons/react/24/outline";
import { GroupMenu, GroupMenuProps } from ".";
import { Button } from "../button";
import { Text } from "../text";

export function ChannelMenu({ title, links, footer }: ChannelMenuProps) {
  return (
    <div className="flex flex-col gap-2">
      <Text>{title}</Text>
      <GroupMenu links={links} />
      {footer && (
        <Button
          size="sm"
          variant="nude"
          startIcon={<PlusIcon className="w-5 h-5 block" />}
          onClick={footer.onClick}
          className="!px-4"
        >
          {footer.label}
        </Button>
      )}
    </div>
  );
}

type ChannelMenuProps = GroupMenuProps & {
  title: string;
  footer?: {
    onClick: () => void;
    label: string;
  };
};
