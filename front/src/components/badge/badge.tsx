import classNames from "classnames";

export function Badge({ label, type = "info" }: BadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold  rounded-full",
        {
          "text-blue-800 bg-blue-200": type === "info",
          "text-white bg-red-500": type === "danger",
        }
      )}
    >
      {label}
    </span>
  );
}

type BadgeProps = {
  label: string | number;
  type?: "info" | "danger";
};
