import { SidebarMenu } from "src/components/menu";
import { useChannels, useCreateChannel } from "../lib/channel.query";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Modal } from "src/components/modal";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "src/components/form";
import { useSocket } from "src/lib/useSocket";

const schema = z.object({
  name: z.string().min(1, { message: "Champ requis" }),
});

type FormValues = z.infer<typeof schema>;

export function ChannelMenu() {
  const socket = useSocket();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useChannels();
  const channels = data ?? [];
  const { mutateAsync, isLoading: createChannelLoading } = useCreateChannel();
  const { control, handleSubmit, formState, reset } = useForm<FormValues>({
    defaultValues: { name: "" },
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { errors, isValid } = formState;

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
    setOpen(false);
    refetch();
    socket.emit("setup_room");
  });

  const onClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <>
      <SidebarMenu
        loading={isLoading}
        title="Canaux"
        links={channels.map((el) => ({
          label: el.name,
          path: `/channel/${el.id}`,
          active: pathname.includes(`/channel/${el.id}`),
        }))}
        footer={{
          label: "Ajouter des cannaux",
          onClick: () => setOpen(true),
        }}
      />
      {open && (
        <Modal
          open={open}
          onClose={onClose}
          onSubmit={onSubmit}
          submitLabel="Enregistrer"
          submitVariant="primary"
          title="Ajouter un canal"
          submitLoading={createChannelLoading}
          submitDisabled={!isValid}
        >
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                name={field.name}
                label="Nom"
                placeholder="Nom du canal"
                value={field.value}
                onChange={field.onChange}
                error={errors.name?.message}
              />
            )}
          />
        </Modal>
      )}
    </>
  );
}
