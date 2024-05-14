interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "mono";
}

export default function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const baseStyle =
    "rounded-full font-bold py-2.5 px-8 shadow-sm";

  const variantStyles = {
    "primary": "bg-indigo-500 active:bg-indigo-700 text-white",
    "secondary": "border border-gray-700 dark:border-zinc-700 active:bg-gray-200 dark:active:bg-zinc-800",
    "mono": "bg-black active:bg-neutral-700 dark:bg-zinc-100 dark:active:bg-zinc-300 text-white dark:text-black",
  }

  const styles = `${baseStyle} ${variantStyles[variant]} ${className || ""}`;

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
