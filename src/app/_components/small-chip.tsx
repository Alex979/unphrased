interface SmallChipProps {
  children: React.ReactNode;
  style?: "primary" | "secondary";
  className?: string;
  responsive?: boolean;
}

export default function SmallChip({
  children,
  style = "primary",
  className,
  responsive = false,
}: SmallChipProps) {
  const colorClasses =
    style === "primary"
      ? "bg-black text-white dark:bg-neutral-100 dark:text-neutral-900"
      : "bg-gray-200 text-black dark:bg-neutral-700 dark:text-neutral-100";

  const textSize = responsive ? "text-xs md:text-base" : "text-xs";
  const padding = responsive ? "px-1.5 py-0.5 md:px-2 md:py-1" : "px-1.5 py-0.5";
  const rounded = responsive ? "rounded md:rounded-md" : "rounded";
  const fontWeight = responsive ? "font-semibold md:font-bold" : "font-semibold";
  
  return (
    <p className={`${textSize} ${className || ""}`}>
      <span className={`${colorClasses} ${padding} ${rounded} ${fontWeight}`}>
        {children}
      </span>
    </p>
  );
}
