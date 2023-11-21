import classNames from "classnames";
import { MouseEventHandler, PropsWithChildren, ReactNode } from "react";
import { Spin } from "../loader";
import { Link } from "react-router-dom";

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
  to,
}: ButtonProps) {
  const disable = disabled || loading;
  const classe = classNames(
    "flex items-center justify-center gap-2 rounded-lg",
    {
      "text-white bg-blue-700 font-medium ": variant === "primary",
      "hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  focus:outline-none":
        variant === "primary" && !disable,
      "text-gray-900 focus:outline-none bg-white border border-gray-200":
        variant === "secondary",
      "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200":
        variant === "secondary" && !disable,
      "hover:bg-gray-100 font-medium": variant === "nude",
      "text-sm px-5 py-2.5": size === "md",
      "px-3 py-2 text-sm": size === "sm",
      "px-3 py-2 text-xs": size === "xs",
      "cursor-not-allowed opacity-75": disable,
    },
    className
  );

  if (to) {
    return (
      <Link to={to} className={classe}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classe} disabled={disable} onClick={onClick}>
      {loading && <Spin />}
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
}

export type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "nude" | "secondary";
  size?: "md" | "sm" | "xs";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  to?: string;
}>;
