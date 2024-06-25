interface PopupProps {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Popup({ children, open, onClose }: PopupProps) {
  return (
    <div
      className={`fixed inset-0 pt-8 transition ${
        !open
          ? "pointer-events-none"
          : "bg-neutral-200 dark:bg-black bg-opacity-70 dark:bg-opacity-70"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full h-full rounded-t-xl shadow-lg bg-white dark:bg-neutral-900 transition flex flex-col ${
          !open ? "translate-y-full" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-end pr-6 pt-6">
          <button onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
