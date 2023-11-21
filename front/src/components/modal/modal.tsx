import { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import { Text } from "../text";
import { Button, ButtonProps, IconButton } from "../button";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function Modal({
  open,
  onClose,
  children,
  onSubmit,
  submitLabel,
  submitVariant,
  title,
  submitDisabled,
  submitLoading,
}: ModalProps) {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          zIndex: 100,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        },
      }}
      className="relative rounded-lg bg-white border-none overflow-auto flex flex-col w-full max-w-2xl max-h-full"
    >
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
        <Text as="h3" className="text-xl font-semibold text-gray-900">
          {title}
        </Text>
        <IconButton Element={XMarkIcon} onClick={onClose} />
      </div>
      <div className="p-4 md:p-5 space-y-4">{children}</div>
      <div className="flex items-center gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b">
        <Button
          disabled={submitDisabled}
          loading={submitLoading}
          variant={submitVariant}
          onClick={onSubmit}
        >
          {submitLabel}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
      </div>
    </ReactModal>
  );
}

type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
  submitVariant: ButtonProps["variant"];
  submitLoading?: boolean;
  submitDisabled?: boolean;
  onSubmit: () => void;
}>;
