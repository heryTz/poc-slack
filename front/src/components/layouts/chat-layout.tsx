import { PropsWithChildren } from "react";
import { AppBar } from "../appbar";
import { MarkdownInput } from "../form";
import { Button } from "../button";

export function ChatLayout({ title, children }: ChatLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar title={title} />
      <div className="flex-1">{children}</div>
      <div className="sticky bottom-0 mx-6 pb-6 bg-white">
        <MarkdownInput
          placeholder="Envoyer un message #general"
          className="!border-gray-400"
        />
        <Button className="mt-2">Envoyer</Button>
      </div>
    </div>
  );
}

type ChatLayoutProps = PropsWithChildren<{
  title: string;
}>;
