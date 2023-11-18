import { Button } from "src/components/button";
import { AuthForm, Input } from "src/components/form";

export function SignupPage() {
  return (
    <AuthForm title="Créer un compte Slack">
      <form className="flex flex-col gap-4">
        <Input
          name="name"
          label="Nom complet"
          placeholder="Votre nom complet"
        />
        <Input
          name="email"
          type="email"
          label="Adresse e-mail"
          placeholder="nom@e-mail-professionnel.com"
        />
        <Button>Créer mon compte</Button>
      </form>
    </AuthForm>
  );
}
