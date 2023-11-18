import classNames from "classnames";
import DefaultAvatar from "src/assets/img/default_avatar.png";

export function Avatar({ alt, src, size = "md" }: AvatarProps) {
  return (
    <img
      className={classNames("rounded shrink-0", {
        "w-10 h-10": size === "md",
        "w-8 h-8": size === "sm",
        "w-6 h-6": size === "xs",
      })}
      src={src ?? DefaultAvatar}
      alt={alt}
    />
  );
}

type AvatarProps = {
  src?: string;
  alt: string;
  size?: "md" | "sm" | "xs";
};
