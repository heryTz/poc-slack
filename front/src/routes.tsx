import { createBrowserRouter } from "react-router-dom";
import { SigninPage } from "./app/auth/signin-page";
import { SignupPage } from "./app/auth/signup-page";
import { OtpPage } from "./app/auth/otp-page";
import { AuthLayout } from "./app/auth/components/auth-layout";
import { ChannelLayout } from "./app/channel/components/channel-layout";
import { WelcomePage } from "./app/channel/welcome-page";
import { PrivateChatPage } from "./app/channel/private-chat-page";
import { ChannelChatPage } from "./app/channel/channel-chat-page";

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
        element: <WelcomePage />,
      },
      {
        path: "channel/:id",
        element: <ChannelChatPage />,
      },
      {
        path: "message/:id",
        element: <PrivateChatPage />,
      },
    ],
  },
]);
