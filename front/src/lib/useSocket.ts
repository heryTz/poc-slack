import { useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { create } from "zustand";

type SocketStore = {
  socket: Socket | null;
  setSocket: (s: Socket) => void;
};

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));

type Options = {
  url: string;
  token: string | null;
};

export function useSocketConnection({ url, token }: Options) {
  const setSocket = useSocketStore((s) => s.setSocket);
  const socket = useSocketStore((s) => s.socket);

  useEffect(() => {
    const socket = io(url, { auth: { token } });
    setSocket(socket);

    socket.emit("setup_room");

    // TODO: handle exception
    // ex: { message: 'Forbidden resource' }
    // socket.on("exception", console.log);

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socket;
}

export function useSocket() {
  const socket = useSocketStore((s) => s.socket);
  if (!socket) throw Error(`"useSocketConnection" is not setuped`);
  return socket;
}
