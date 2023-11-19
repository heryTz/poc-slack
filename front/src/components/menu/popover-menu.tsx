import { Link } from "react-router-dom";
import { Popover, PopoverProps } from "../popover";

export function PopoverMenu({ menus, ...popoverProps }: PopoverMenuProps) {
  return (
    <Popover {...popoverProps}>
      <ul className="py-2 text-sm text-gray-700">
        {menus.map((el) => (
          <PopoverMenuItem key={el.label} {...el} />
        ))}
      </ul>
    </Popover>
  );
}

export type PopoverMenuProps = PopoverProps & {
  menus: PopoverMenuItemProps[];
};

function PopoverMenuItem({ label, onClick, to }: PopoverMenuItemProps) {
  const classes = "block px-4 py-2 hover:bg-gray-100";

  if (to) {
    return (
      <li>
        <Link to={to} className={classes} onClick={onClick}>
          {label}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button className={classes} onClick={onClick}>
        {label}
      </button>
    </li>
  );
}

type PopoverMenuItemProps = {
  label: string;
  onClick?: () => void;
  to?: string;
};
