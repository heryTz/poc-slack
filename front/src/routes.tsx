import { createBrowserRouter } from "react-router-dom";
import { SigninPage } from "./app/auth/signin-page";
import { SignupPage } from "./app/auth/signup-page";
import { AuthLayout, ChannelLayout } from "./components/layouts";
import { OtpPage } from "./app/auth/otp-page";
import { ChatPage } from "./app/channel/chat-page";

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
      {
        path: "otp",
        element: <OtpPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ChannelLayout />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
      {
        path: "channel/:id",
        element: <ChatPage />,
      },
    ],
  },
]);
