import { useEffect, useRef } from "react";

function MessageBubble({
  message,
  onAnimationEnd,
}: {
  message: string;
  onAnimationEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.addEventListener("animationend", onAnimationEnd);

    return () => {
      ref.current?.removeEventListener("animationend", onAnimationEnd);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="p-3 bg-slate-900 text-white dark:bg-white dark:text-black text-sm font-bold rounded-md shadow-md animate-fade-out animation-delay-1000"
    >
      <p>{message}</p>
    </div>
  );
}

interface NotificationsProps {
  messages: { message: string; id: number }[];
  onAnimationEnd: () => void;
}

export default function Notifications({
  messages,
  onAnimationEnd,
}: NotificationsProps) {
  const reversedMessages = messages.toReversed();

  return (
    <div className="fixed inset-0 flex flex-col items-center pt-28 pointer-events-none space-y-4">
      {reversedMessages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message.message}
          onAnimationEnd={onAnimationEnd}
        />
      ))}
    </div>
  );
}
