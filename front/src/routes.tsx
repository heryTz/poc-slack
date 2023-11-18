import { createBrowserRouter } from "react-router-dom";
import { SigninPage } from "./app/signin/signin-page";
import { SignupPage } from "./app/signup/signup-page";
import { AuthLayout } from "./components/layouts";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SigninPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "/",
    element: <div>Home</div>,
  },
]);
