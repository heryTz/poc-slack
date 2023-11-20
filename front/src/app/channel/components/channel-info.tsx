import { ReactNode } from "react";
import { Text } from "src/components/text";

export function ChannelInfo({ title, description }: ChannelInfoProps) {
  return (
    <div className="px-6 pt-6">
      <Text as="h3" className="mb-2">
        # {title}
      </Text>
      <Text>{description}</Text>
    </div>
  );
}

type ChannelInfoProps = {
  title: string;
  description: ReactNode;
};
