import { PropsWithChildren } from "react";
import { AppBar } from "../appbar";
import { MarkdownInput } from "../form";

export function ChatLayout({ title, children }: ChatLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <AppBar title={title} />
      <div className="p-6 flex-1">{children}</div>
      <div className="sticky bottom-6 px-6">
        <MarkdownInput />
      </div>
    </div>
  );
}

type ChatLayoutProps = PropsWithChildren<{
  title: string;
}>;
