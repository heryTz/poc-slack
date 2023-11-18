import classNames from "classnames";
import { MouseEventHandler, PropsWithChildren, ReactNode } from "react";

export function Button({
  children,
  disabled,
  variant = "primary",
  className,
  size = "md",
  onClick,
  startIcon,
  endIcon,
}: ButtonProps) {
  let classes = "flex items-center gap-2 ";
  if (variant === "primary") {
    classes +=
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg focus:outline-none ";
  } else if (variant === "nude") {
    classes += "hover:bg-gray-100 font-medium rounded-lg ";
  }

  if (size === "md") {
    classes += "text-sm px-5 py-2.5";
  } else if (size === "sm") {
    classes += "px-3 py-2 text-xs";
  } else if (size === "xs") {
    classes += "px-3 py-2 text-xs";
  }

  return (
    <button
      className={classNames(classes, className)}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  variant?: "primary" | "nude";
  size?: "md" | "sm" | "xs";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}>;
