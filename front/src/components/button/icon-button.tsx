export function IconButton({ Element }: IconButtonProps) {
  return (
    <button className="rounded-lg p-2 hover:bg-gray-100">
      <Element className="w-6 h-6" />
    </button>
  );
}

type IconButtonProps = {
  Element: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
};
