interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function InputField({
  label,
  error,
  className,
  ...props
}: InputFieldProps) {
  const baseStyles =
    "dark:bg-zinc-900 border border-gray-400 dark:border-zinc-400 rounded-md p-2.5 block focus:border-black dark:focus:border-zinc-100 placeholder-gray-400 dark:placeholder-zinc-400 outline-none shadow-sm";

  const styles = `${baseStyles} ${className || ""}`;

  return (
    <div>
      <label>
        <p className="font-bold my-1.5 text-sm">{label}</p>
        <input type="text" className={styles} {...props} />
      </label>
      {error && (
        <div className="flex items-center text-red-500 my-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 mr-1.5"
          >
            <path
              fillRule="evenodd"
              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}
    </div>
  );
}
