export function AuthForm({ title }: AuthFormProps) {
  return <div>{title}</div>;
}

type AuthFormProps = {
  title: string;
  submitLabel: string;
};
