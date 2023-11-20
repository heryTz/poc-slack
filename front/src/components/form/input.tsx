import classNames from "classnames";
import { ChangeEventHandler } from "react";

export function Input({
  label,
  name,
  placeholder,
  type = "text",
  error,
  value,
  onChange,
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={classNames("block mb-2 text-sm font-medium", {
            "text-gray-900": !error,
            "text-red-700": error,
          })}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        className={classNames("text-sm rounded-lg block w-full p-2.5", {
          "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900":
            !error,
          "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500":
            error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
}

type InputProps = {
  type?: "text" | "number" | "email" | "password";
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};
