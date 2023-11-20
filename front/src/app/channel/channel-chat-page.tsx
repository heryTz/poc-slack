import { useParams } from "react-router-dom";
import { ChatPage } from "./chat-page";
import { ChatLoading } from "./components/chat-loading";
import { useChannel } from "./lib/channel.query";
import dayjs from "dayjs";

export function ChannelChatPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useChannel({
    id: +id!,
  });

  if (isLoading || !data) return <ChatLoading />;

  return (
    <ChatPage
      title={data.name}
      description={
        <>
          Ce canal a été créé le {dayjs(data.createdAt).format("DD MMMM YYYY")}.
          Ceci est le tout début du <b># {data.name}.</b>
        </>
      }
      channelId={data.id}
    />
  );
}
