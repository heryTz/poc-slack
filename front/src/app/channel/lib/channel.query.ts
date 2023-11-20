import { useMutation, useQuery } from "react-query";
import { ChannelService, CreateChannelInput } from "src/api-sdk";

export function useChannels() {
  return useQuery("channels", () => ChannelService.find());
}

export function useCreateChannel() {
  return useMutation("create_channel", (body: CreateChannelInput) =>
    ChannelService.create({ body })
  );
}

export function useChannel(id: number) {
  return useQuery(["channel", id], () =>
    ChannelService.channel({ id: id?.toString() })
  );
}
