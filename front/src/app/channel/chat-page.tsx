import { Divider } from "src/components/divider";
import { ColumnLayout } from "src/components/layouts";
import { MessageItem } from "src/components/message";
import { useMessages } from "./lib/message.query";
import { Spin } from "src/components/loader";
import "dayjs/locale/fr";
import { ChannelInfo } from "./components/channel-info";
import { ChatInput } from "./components/chat-input";
import { useMessageStore } from "./lib/message.store";
import { ReactNode, useEffect } from "react";
import { useSocket } from "src/lib/useSocket";

export function ChatPage({
  title,
  description,
  channelId,
  receiverId,
}: ChatPageProps) {
  const socket = useSocket();
  const { setMessage, addMessage } = useMessageStore();
  const messages = useMessageStore((s) => s.messages);
  const { data: messagesData, isLoading: loadingMessage } = useMessages({
    channelId,
    receiverId,
  });

  useEffect(() => {
    socket.on(`send_message`, addMessage);

    return () => {
      socket.off("send_message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket.id]);

  useEffect(() => {
    if (messagesData) setMessage(messagesData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData]);

  return (
    <ColumnLayout zIndex={2} title={`# ${title}`} titleMenus={[]}>
      <ChannelInfo title={title} description={description} />
      <Divider className="my-6" />
      {loadingMessage ? (
        <div className="h-32 w-full flex justify-center items-center">
          <Spin className="!text-blue-800 w-6 h-6" />
        </div>
      ) : (
        <div className="px-4 pb-6">
          {messages.map((el) => (
            <MessageItem
              key={el.id}
              author={el.Author.name}
              message={el.content}
              createdAt={new Date(el.createdAt)}
            />
          ))}
        </div>
      )}
      <div className="sticky bottom-0 mx-6 pb-6 bg-white">
        <ChatInput
          title={title}
          channelId={channelId}
          receiverId={receiverId}
        />
      </div>
    </ColumnLayout>
  );
}

type ChatPageProps = {
  title: string;
  description: ReactNode;
  channelId?: number;
  receiverId?: number;
};
