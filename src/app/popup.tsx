interface PopupProps {
  children?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Popup({ children, open, onClose }: PopupProps) {
  return (
    <div
      className={`fixed w-screen h-screen bg-white dark:bg-zinc-900 transition flex flex-col ${
        !open ? "translate-y-full" : ""
      }`}
    >
      <div className="flex items-center justify-end pr-8 pt-8 pb-5">
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
  );
}
