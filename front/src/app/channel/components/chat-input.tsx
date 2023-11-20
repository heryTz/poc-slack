import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { CreateMessageInput, TypingMessageInput } from "src/api-sdk";
import { Button } from "src/components/button";
import { MarkdownInput } from "src/components/form";
import { useSocket } from "src/lib/useSocket";
import * as z from "zod";

const schema = z.object({
  content: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export function ChatInput({ title, channelId, receiverId }: ChatInputProps) {
  const socket = useSocket();
  const { control, formState, handleSubmit, reset } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: { content: "" },
    resolver: zodResolver(schema),
  });
  const { isValid } = formState;

  const onSubmit = handleSubmit((data) => {
    socket.emit("send_message", {
      ...data,
      channelId,
      receiverId,
    } as CreateMessageInput);
    reset();
  });

  const onFocus = () => {
    socket.emit("typing_message", {
      channelId,
    } as TypingMessageInput);
  };

  const onBlur = () => {
    socket.emit("end_typing_message", {
      channelId,
    } as TypingMessageInput);
  };

  return (
    <>
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <MarkdownInput
            placeholder={`Envoyer un message #${title}`}
            className="!border-gray-400"
            value={field.value}
            onChange={field.onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={(e) => e.key === "Enter" && isValid && onSubmit()}
          />
        )}
      />
      <Button className="mt-2" disabled={!isValid} onClick={onSubmit}>
        Envoyer
      </Button>
    </>
  );
}

type ChatInputProps = {
  title: string;
  channelId?: number;
  receiverId?: number;
};
