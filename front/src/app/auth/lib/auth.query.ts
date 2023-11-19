import { useMutation } from "react-query";
import {
  AuthService,
  CreateUserInput,
  SigninInput,
  VerifyOtpInput,
} from "src/api-sdk";

export function useSignin() {
  return useMutation("signin", {
    mutationFn: (body: SigninInput) => AuthService.signin({ body }),
  });
}

export function useSignup() {
  return useMutation("signup", (body: CreateUserInput) =>
    AuthService.signup({ body })
  );
}

export function useVerityOtp() {
  return useMutation("verifyOtp", (body: VerifyOtpInput) =>
    AuthService.verifyOtp({ body })
  );
}
