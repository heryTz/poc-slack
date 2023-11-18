import classNames from "classnames";
import { ReactNode } from "react";

export function GroupMenu({ links }: GroupMenuProps) {
  return (
    <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg overflow-hidden">
      {links.map((el) => (
        <a
          key={el.path}
          href={el.path}
          className={classNames(
            "flex justify-between items-center w-full px-4 py-2 border-b border-gray-200 cursor-pointer",
            {
              "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700":
                !el.active,
              "bg-blue-700 text-white": el.active,
            }
          )}
        >
          {el.label}
          {el.endIcon}
        </a>
      ))}
    </div>
  );
}

export type GroupMenuProps = {
  links: {
    label: string;
    path: string;
    active?: boolean;
    endIcon?: ReactNode;
  }[];
};
