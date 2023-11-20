import { PropsWithChildren, ReactNode } from "react";
import { AppBar, AppBarProps } from "../appbar";
import classNames from "classnames";

export function ColumnLayout({
  title,
  children,
  className,
  toolbar,
  contentClassName,
  appBarClassName,
  zIndex = 1,
  titleMenus,
}: ColumnLayoutProps) {
  return (
    <div className={classNames("min-h-screen flex flex-col", className)}>
      <AppBar
        title={title}
        titleMenus={titleMenus}
        className={classNames(
          "sticky top-0 bg-white",
          { "z-10": zIndex === 1, "z-20": zIndex === 2, "z-30": zIndex === 3 },
          appBarClassName
        )}
        toolbar={toolbar}
      />
      <div
        className={classNames(
          "flex-1 overflow-auto max-h-[calc(100vh-69px)]",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

type ColumnLayoutProps = PropsWithChildren<
  AppBarProps & {
    className?: string;
    toolbar?: ReactNode;
    appBarClassName?: string;
    contentClassName?: string;
    zIndex?: 1 | 2 | 3;
  }
>;
