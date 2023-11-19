import { ReactNode } from "react";
import { Button } from "../button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

export function AppBar({ title, toolbar, className }: AppBarProps) {
  return (
    <div
      className={classNames(
        "py-3.5 pl-1 pr-3.5 flex items-center justify-between border-b border-slate-200 h-[69px]",
        className,
      )}
    >
      <Button
        variant="nude"
        className="text-left text-base"
        endIcon={<ChevronDownIcon className="w-5 h-5 shrink-0" />}
      >
        <span className="line-clamp-1 font-bold">{title}</span>
      </Button>
      {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
    </div>
  );
}

type AppBarProps = {
  title: string;
  toolbar?: ReactNode;
  className?: string;
};
