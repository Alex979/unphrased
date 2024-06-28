interface SmallChipProps {
  children: React.ReactNode;
  style?: "primary" | "secondary";
  className?: string;
}

export default function SmallChip({
  children,
  style = "primary",
  className,
}: SmallChipProps) {
  const colorClasses =
    style === "primary"
      ? "bg-black text-white dark:bg-neutral-100 dark:text-neutral-900"
      : "bg-gray-200 text-black dark:bg-neutral-700 dark:text-neutral-100";

  return (
    <p className={`text-xs ${className || ""}`}>
      <span className={`${colorClasses} px-1.5 py-0.5 rounded font-semibold`}>
        {children}
      </span>
    </p>
  );
}
