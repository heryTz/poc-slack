export function Input({ label, name, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
}

type InputProps = {
  type?: "text" | "number" | "email" | "password";
  name: string;
  label?: string;
  placeholder?: string;
};
