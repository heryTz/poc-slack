import { MessageResponse } from "src/api-sdk";
import { create } from "zustand";

type MessageStore = {
  messages: MessageResponse[];
  setMessage: (messages: MessageResponse[]) => void;
  addMessage: (message: MessageResponse) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  typings: [],
  setMessage: (messages: MessageResponse[]) => set({ messages }),
  addMessage: (message) =>
    set((prev) => ({ messages: [...prev.messages, message] })),
}));
