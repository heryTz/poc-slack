import { Spin } from "src/components/loader";

export function ChatLoading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spin className="!text-blue-800 w-6 h-6" />
    </div>
  );
}
