import { useParams } from "react-router-dom";
import { Button } from "src/components/button";
import { Divider } from "src/components/divider";
import { MarkdownInput } from "src/components/form";
import { ColumnLayout } from "src/components/layouts";
import { MessageItem } from "src/components/message";
import { Text } from "src/components/text";
import { useChannel } from "./lib/channel.query";
import { useMessages } from "./lib/message.query";
import { Spin } from "src/components/loader";
import "dayjs/locale/fr";
import dayjs from "dayjs";

export function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const channelId = +(id ?? "0");
  const { data: channel, isLoading: loadingChannel } = useChannel(channelId);
  const { isLoading: loadingMessage } = useMessages({
    channelId,
  });

  if (loadingChannel || !channel)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spin className="!text-blue-800 w-6 h-6" />
      </div>
    );

  return (
    <ColumnLayout zIndex={2} title={`# ${channel.name}`} titleMenus={[]}>
      <div className="px-6 pt-6">
        <Text as="h3" className="mb-2">
          # {channel.name}
        </Text>
        <Text>
          Ce canal a été créé le{" "}
          {dayjs(channel.createdAt).format("DD MMMM YYYY")}. Ceci est le tout
          début du <b># {channel.name}.</b>
        </Text>
      </div>
      <Divider className="my-6" />
      {loadingMessage ? (
        <div className="h-32 w-full flex justify-center items-center">
          <Spin className="!text-blue-800 w-6 h-6" />
        </div>
      ) : (
        <div className="px-4 pb-6">
          {[1, 2, 3, 4].map((el) => (
            <MessageItem
              key={el}
              author={`Author ${el}`}
              message={"est-ce que staging est dispo ?"}
              createdAt={new Date()}
            />
          ))}
          <MessageItem
            author={`Author 5`}
            avatarSrc="https://picsum.photos/200/200"
            message={[
              "Pas de daily ce matin",
              "Je dois aller faire les vaccins de bébé",
            ]}
            createdAt={new Date()}
          />
          {[6, 7, 8, 9, 10, 11, 12, 13].map((el) => (
            <MessageItem
              key={el}
              author={`Author ${el}`}
              message={"est-ce que staging est dispo ?"}
              createdAt={new Date()}
            />
          ))}
        </div>
      )}

      <div className="sticky bottom-0 mx-6 pb-6 bg-white">
        <MarkdownInput
          placeholder="Envoyer un message #general"
          className="!border-gray-400"
        />
        <Button className="mt-2">Envoyer</Button>
      </div>
    </ColumnLayout>
  );
}
