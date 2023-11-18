import { Button } from "src/components/button";
import { AuthForm, Input } from "src/components/form";

export function SigninPage() {
  return (
    <AuthForm title="Se connecter à Slack">
      <form className="flex flex-col gap-4">
        <Input
          name="email"
          type="email"
          label="Adresse e-mail"
          placeholder="nom@e-mail-professionnel.com"
        />
        <Button>Se connecter avec un e-mail</Button>
      </form>
    </AuthForm>
  );
}
