import { Button } from "src/components/button";
import { AuthForm, Input } from "src/components/form";
import { useAuth } from "./lib/useAuth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";

const schema = z.object({
  otp: z.string().min(1, { message: "Champ requis" }),
});

type FormValues = z.infer<typeof schema>;

export function OtpPage() {
  const navigate = useNavigate();
  const { verifyOtp, verifyOtpLoading } = useAuth();
  const { state } = useLocation();
  const { handleSubmit, formState, setError, control } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { isValid, errors } = formState;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyOtp({ ...data, email: state.email });
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.data?.message) {
          case "otp invalid":
            setError("otp", { message: "Code otp invalide" });
            break;
          case "otp expired":
            // TODO: handle otp resend
            setError("otp", { message: "Code otp expiré" });
            break;
          default:
            setError("otp", { message: error.response?.data?.message });
            break;
        }
      }
    }
  });

  if (!state.email) return <Navigate to={"/auth/signin"} replace />;

  return (
    <AuthForm
      title="Vérifier le code"
      subtitle={
        <>
          Nous avons envoyé un code à 6 chiffres à l’adresse{" "}
          <b>{state.email}</b> Veuillez saisir le code rapidement, car il arrive
          bientôt à expiration.
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <Input
              name={field.name}
              label="Code de verification"
              placeholder="123456"
              value={field.value}
              onChange={field.onChange}
              error={errors.otp?.message}
            />
          )}
        />
        <Button
          loading={verifyOtpLoading}
          disabled={!isValid}
          onClick={onSubmit}
        >
          Vérifier
        </Button>
      </div>
    </AuthForm>
  );
}
