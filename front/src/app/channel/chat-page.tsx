import { Divider } from "src/components/divider";
import { ChatLayout } from "src/components/layouts";
import { MessageItem } from "src/components/message";
import { Text } from "src/components/text";

export function ChatPage() {
  return (
    <ChatLayout title="# général">
      <div className="px-6 pt-6">
        <Text as="h3" className="mb-2">
          # général
        </Text>
        <Text>
          Ce canal a été créé le 6 mai 2021. Ceci est le tout début du général{" "}
          <b># projet.</b>
        </Text>
      </div>
      <Divider className="my-6" />
      <div className="px-4 pb-6">
        {[1, 2, 3, 4].map((el) => (
          <MessageItem
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
            author={`Author ${el}`}
            message={"est-ce que staging est dispo ?"}
            createdAt={new Date()}
          />
        ))}
      </div>
    </ChatLayout>
  );
}
