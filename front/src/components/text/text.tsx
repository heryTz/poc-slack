import classNames from "classnames";
import { PropsWithChildren } from "react";

export function Text({ as, className, children }: TextProps) {
  if (as === "h1")
    return (
      <h1
        className={classNames(
          "text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl",
          className,
        )}
      >
        {children}
      </h1>
    );

  if (as === "h2") {
    return (
      <h2 className={classNames("text-4xl font-extrabold", className)}>
        {children}
      </h2>
    );
  }

  if (as === "h3") {
    return (
      <h3 className={classNames("text-3xl font-bold", className)}>
        {children}
      </h3>
    );
  }

  if (as === "h4") {
    return <h4 className={classNames("font-bold", className)}>{children}</h4>;
  }

  if (as === "span") {
    return (
      <span className={classNames("text-gray-500", className)}>{children}</span>
    );
  }

  return <p className={classNames("text-gray-500", className)}>{children}</p>;
}

type TextProps = PropsWithChildren<{
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span";
  className?: string;
}>;
