import { Button } from "src/components/button";
import { AuthForm, Input } from "src/components/form";

export function OtpPage() {
  return (
    <AuthForm
      title="Vérifier le code contenu dans votre messagerie électronique"
      subtitle={
        <>
          Nous avons envoyé un code à 6 chiffres à l’adresse <b>hhery889@gmail.com.</b>
          Veuillez saisir le code rapidement, car il arrive bientôt à
          expiration.
        </>
      }
    >
      <form className="flex flex-col gap-4">
        <Input name="otp" label="Code de verification" placeholder="123456" />
        <Button>Vérifier</Button>
      </form>
    </AuthForm>
  );
}
