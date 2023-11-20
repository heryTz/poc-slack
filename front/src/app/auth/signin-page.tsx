import { Button } from "src/components/button";
import { AuthForm, Input } from "src/components/form";
import { useSignin } from "./lib/auth.query";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Text } from "src/components/text";
import { AuthStatus, useAuth } from "./lib/useAuth";

const schema = z.object({
  email: z.string().email({ message: "Email invalide" }),
});

type FormValues = z.infer<typeof schema>;

export function SigninPage() {
  const navigate = useNavigate();
  const { status } = useAuth();
  const { mutateAsync, isLoading } = useSignin();
  const { handleSubmit, formState, setError, control } = useForm<FormValues>({
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
        if (error.response?.status === 404) {
          setError("email", {
            message: `Cet utilisateur n'est pas encore inscrit`,
          });
        }
      }
    }
  });

  if (status === AuthStatus.Authenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <AuthForm title="Se connecter à Slack">
      <div className="flex flex-col gap-4">
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
            Se connecter avec un e-mail
          </Button>
          <Text className="text-center">ou</Text>
          <Button variant="secondary" to="/auth/signup">
            Créer un compte
          </Button>
        </div>
      </div>
    </AuthForm>
  );
}
