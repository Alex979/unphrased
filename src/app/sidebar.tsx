import Link from "next/link";

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
        className={`absolute p-4 transition-transform ${
          !open ? "-translate-x-full" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg border border-gray-200 dark:border-neutral-800">
          <div className="flex flex-col">
            <Link
              href="/"
              className="m-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800"
            >
              <span className="mr-3">☀️</span>Today
            </Link>
            <hr className="border-gray-300 dark:border-neutral-700 mx-3" />
            <Link
              href="/archive"
              className="m-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800"
            >
              <span className="mr-3">📅</span>Archive
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
