import classNames from "classnames";
import { ChangeEventHandler, FocusEventHandler } from "react";

export function MarkdownInput({
  placeholder,
  className,
  value,
  onChange,
  onFocus,
  onBlur,
}: MarkdownInputProps) {
  return (
    <textarea
      rows={4}
      className={classNames(
        "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    ></textarea>
  );
}

type MarkdownInputProps = {
  placeholder: string;
  className?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};
