import { PropsWithChildren, ReactNode } from "react";
import { Text } from "../text";

export function AuthForm({ title, children, subtitle }: AuthFormProps) {
  return (
    <>
      <div className="flex flex-col gap-4 mb-6 text-center">
        <Text as="h1">{title}</Text>
        {subtitle && <Text>{subtitle}</Text>}
      </div>
      <div className="max-w-md mx-auto">{children}</div>
    </>
  );
}

type AuthFormProps = PropsWithChildren<{
  title: string;
  subtitle?: ReactNode;
}>;
