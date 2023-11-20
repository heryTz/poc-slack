import { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { create } from "zustand";

type SocketStore = {
  socket: Socket | null;
  setSocket: (s: Socket) => void;
};

const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));

type Options = {
  url: string;
  token: string | null;
};

export function useSocketConnection({ url, token }: Options) {
  const setSocket = useSocketStore((s) => s.setSocket);

  useEffect(() => {
    const socket = io(url, {
      transports: ["websocket"],
      auth: { token },
    });
    setSocket(socket);

    // TODO: handle exception
    // ex: { message: 'Forbidden resource' }
    // socket.on("exception", console.log);

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
}

export function useSocket() {
  const socket = useSocketStore((s) => s.socket);
  return socket;
}
