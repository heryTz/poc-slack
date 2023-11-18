import classNames from "classnames";

export function IconButton({ Element, size = "md" }: IconButtonProps) {
  return (
    <button
      className={classNames("rounded-lg hover:bg-gray-100", {
        "p-2": size === "md",
        "p-1": size === "sm",
      })}
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
};
