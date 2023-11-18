export function Divider({ className }: DividerProps) {
  return <hr className={className} />;
}

type DividerProps = {
  className?: string;
};
