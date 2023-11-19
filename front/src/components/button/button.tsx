import classNames from "classnames";
import { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { Spin } from "../loader";

export function Button({
  children,
  disabled,
  variant = "primary",
  className,
  size = "md",
  onClick,
  startIcon,
  endIcon,
  loading,
}: ButtonProps) {
  const disable = disabled || loading;

  return (
    <button
      className={classNames(
        "flex items-center justify-center gap-2",
        {
          "text-white bg-blue-700 font-medium rounded-lg ":
            variant === "primary",
          "hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  focus:outline-none":
            variant === "primary" && !disable,
          "hover:bg-gray-100 font-medium rounded-lg": variant === "nude",
          "text-sm px-5 py-2.5": size === "md",
          "px-3 py-2 text-sm": size === "sm",
          "px-3 py-2 text-xs": size === "xs",
          "cursor-not-allowed opacity-75": disable,
        },
        className
      )}
      disabled={disable}
      onClick={onClick}
    >
      {loading && <Spin />}
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "nude";
  size?: "md" | "sm" | "xs";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}>;
