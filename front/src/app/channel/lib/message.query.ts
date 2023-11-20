import { useQuery } from "react-query";
import { MessageService } from "src/api-sdk";

type Query = {
  channelId?: number;
  receiverId?: number;
};

export function useMessages({ channelId, receiverId }: Query) {
  return useQuery(["messages", channelId, receiverId], () =>
    MessageService.find({ channelId, receiverId })
  );
}
