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

type ChannelOptions = {
  id: number;
  disabled?: boolean;
};

export function useChannel({ id, disabled }: ChannelOptions) {
  return useQuery(["channel", id], {
    enabled: !disabled,
    queryFn: () => ChannelService.channel({ id: id?.toString() }),
  });
}
