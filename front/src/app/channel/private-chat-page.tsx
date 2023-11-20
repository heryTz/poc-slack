import { useParams } from "react-router-dom";
import { useGetUserById } from "../user/lib/user.query";
import { ChatPage } from "./chat-page";
import { ChatLoading } from "./components/chat-loading";

export function PrivateChatPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetUserById({
    id: +id!,
  });

  if (isLoading || !data) return <ChatLoading />;

  return (
    <ChatPage
      title={data.name}
      description={
        <>
          Cette conversation n’a lieu qu’entre <b>{data.name}</b> et vous.
          Consultez son profil pour en savoir plus.
        </>
      }
      receiverId={data.id}
    />
  );
}
