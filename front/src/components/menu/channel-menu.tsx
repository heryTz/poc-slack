import { PlusIcon } from "@heroicons/react/24/outline";
import { GroupMenu, GroupMenuProps } from ".";
import { Button } from "../button";
import { Text } from "../text";
import { Spin } from "../loader";

export function ChannelMenu({
  title,
  links,
  footer,
  loading,
}: ChannelMenuProps) {
  return (
    <div className="flex flex-col gap-2">
      <Text>{title}</Text>
      {loading ? (
        <div className="w-full h-28 flex justify-center items-center">
          <Spin className="w-6 h-6 !text-blue-800" />
        </div>
      ) : (
        <GroupMenu links={links} />
      )}

      {footer && (
        <Button
          size="sm"
          variant="nude"
          startIcon={<PlusIcon className="w-5 h-5 block" />}
          onClick={footer.onClick}
          className="!px-4 !justify-start"
        >
          {footer.label}
        </Button>
      )}
    </div>
  );
}

type ChannelMenuProps = GroupMenuProps & {
  title: string;
  loading?: boolean;
  footer?: {
    onClick: () => void;
    label: string;
  };
};
