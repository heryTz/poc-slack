import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="max-w-3xl min-h-screen p-4 m-auto">
      <Outlet />
    </div>
  );
}
