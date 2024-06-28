interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed w-full h-full z-10 transition ${
        !open
          ? "pointer-events-none"
          : "bg-neutral-200 dark:bg-black bg-opacity-70 dark:bg-opacity-70"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full h-full max-w-xs bg-white dark:bg-neutral-900 shadow-lg transition-transform ${
          !open ? "-translate-x-full" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col py-4">
          <a href="/" className="py-3 px-4 hover:bg-neutral-100 dark:hover:bg-zinc-800"><span className="mr-3">☀️</span>Today</a>
          <a href="/archive" className="py-3 px-4 hover:bg-neutral-100 dark:hover:bg-zinc-800"><span className="mr-3">📅</span>Archive</a>
        </div>
      </div>
    </div>
  );
}
