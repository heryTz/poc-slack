import { PropsWithChildren } from "react";
import ReactModal from "react-modal";

export function Modal({ open, onClose, children }: ModalProps) {
  return (
    <ReactModal
      isOpen={open || true}
      onRequestClose={onClose}
      style={{ overlay: { zIndex: 100 } }}
      bodyOpenClassName={"relative p-4 w-full max-w-2xl max-h-full bg-red"}
    >
      {children}
    </ReactModal>
  );
}

type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;
