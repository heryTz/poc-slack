import { castArray } from "lodash";
import { Avatar } from "../avatar";
import { Text } from "../text";
import dayjs from "dayjs";
import { IconButton } from "../button";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export function MessageItem({
  avatarSrc,
  author,
  message,
  createdAt,
}: MessageItemProps) {
  const msgArray = castArray(message);

  return (
    <div className="flex gap-2 p-2 relative group cursor-pointer rounded-lg hover:bg-gray-50">
      <Avatar size="sm" src={avatarSrc} alt={`${author} avatar`} />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Text as="h4">{author}</Text>
          <Text as="span" className="font-light text-sm">
            {dayjs(createdAt).format("HH [h] mm")}
          </Text>
        </div>
        {msgArray.map((el, i) => (
          <Text key={i} className="text-gray-700">
            {el}
          </Text>
        ))}
      </div>
      <div className="hidden group-hover:flex bg-white items-center gap-1 border border-gray-50 shadow p-[2px] absolute -top-4 right-0 rounded z-10">
        <IconButton size="sm" Element={ChatBubbleOvalLeftEllipsisIcon} />
        <IconButton size="sm" Element={EllipsisVerticalIcon} />
      </div>
    </div>
  );
}

type MessageItemProps = {
  avatarSrc?: string;
  author: string;
  message: string | string[];
  createdAt: Date;
};
