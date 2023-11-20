import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "src/components/button";
import { AuthForm, Input } from "src/components/form";
import { AuthStatus, useAuth } from "./lib/useAuth";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "./lib/auth.query";
import { AxiosError } from "axios";
import { Text } from "src/components/text";

const schema = z.object({
  name: z.string().min(1, { message: "Champ requis" }),
  email: z.string().email({ message: "Email invalide" }),
});

type FormValues = z.infer<typeof schema>;

export function SignupPage() {
  const navigate = useNavigate();
  const { status } = useAuth();
  const { mutateAsync, isLoading } = useSignup();
  const { control, formState, handleSubmit, setError } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { isValid, errors } = formState;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await mutateAsync(data);
      navigate("/auth/otp", { state: data });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError("email", { message: "Cet email est déjà utilisé" });
        }
      }
    }
  });

  if (status === AuthStatus.Authenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <AuthForm title="Créer un compte Slack">
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              name={field.name}
              label="Nom complet"
              placeholder="Votre nom complet"
              value={field.value}
              onChange={field.onChange}
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              name={field.name}
              type="email"
              label="Adresse e-mail"
              placeholder="nom@e-mail-professionnel.com"
              value={field.value}
              onChange={field.onChange}
              error={errors.email?.message}
            />
          )}
        />
        <div className="flex flex-col gap-2">
          <Button loading={isLoading} disabled={!isValid} onClick={onSubmit}>
            Créer mon compte
          </Button>
          <Text className="text-center">ou</Text>
          <Button variant="secondary" to="/auth/signin">
            Se connecter avec un e-mail
          </Button>
        </div>
      </div>
    </AuthForm>
  );
}
