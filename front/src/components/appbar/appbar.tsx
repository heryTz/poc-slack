import { ReactNode, useState } from "react";
import { Button } from "../button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { PopoverMenu, PopoverMenuProps } from "../menu";

export function AppBar({ title, toolbar, className, titleMenus }: AppBarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <div
      className={classNames(
        "py-3.5 pl-1 pr-3.5 flex items-center justify-between border-b border-slate-200 h-[69px]",
        className
      )}
    >
      <Button
        variant="nude"
        className="text-left text-base"
        endIcon={<ChevronDownIcon className="w-5 h-5 shrink-0" />}
        onClick={(e) => setAnchorEl(e.currentTarget as HTMLButtonElement)}
      >
        <span className="line-clamp-1 font-bold">{title}</span>
      </Button>
      {anchorEl && (
        <PopoverMenu
          isOpen
          anchorEl={anchorEl}
          menus={titleMenus}
          onClose={() => setAnchorEl(null)}
        />
      )}
      {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
    </div>
  );
}

export type AppBarProps = {
  title: string;
  titleMenus: PopoverMenuProps["menus"];
  toolbar?: ReactNode;
  className?: string;
};
