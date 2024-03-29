import classNames from "classnames";
import { MouseEventHandler } from "react";

export function IconButton({ Element, size = "md", onClick }: IconButtonProps) {
  return (
    <button
      className={classNames("rounded-lg hover:bg-gray-100", {
        "p-2": size === "md",
        "p-1": size === "sm",
      })}
      onClick={onClick}
    >
      <Element
        className={classNames({
          "w-6 h-6": size === "md",
          "w-4 h-4": size === "sm",
        })}
      />
    </button>
  );
}

type IconButtonProps = {
  size?: "md" | "sm";
  Element: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
