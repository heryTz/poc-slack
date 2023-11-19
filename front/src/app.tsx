import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useAuth } from "./app/auth/lib/useAuth";
import { useEffect } from "react";

export function App() {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
}
