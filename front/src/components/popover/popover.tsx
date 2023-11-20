import { ComponentProps, PropsWithChildren } from "react";
import Tippy from "@tippyjs/react/headless";

export function Popover({
  children,
  anchorEl,
  isOpen,
  onClose,
  placement,
  maxWidth,
}: PopoverProps) {
  return (
    <Tippy
      placement={placement}
      reference={anchorEl}
      visible={isOpen}
      onClickOutside={onClose}
      maxWidth={maxWidth}
      interactive
      render={(attrs) => (
        <div
          tabIndex={-1}
          {...attrs}
          className="bg-white divide-y divide-gray-100 rounded-lg shadow"
          style={{ maxWidth }}
        >
          {children}
        </div>
      )}
    />
  );
}

type TippyProps = ComponentProps<typeof Tippy>;

export type PopoverProps = PropsWithChildren<{
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  placement?: TippyProps["placement"];
  maxWidth?: string | number;
}>;
