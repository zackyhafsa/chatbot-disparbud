import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MessagePropsType = {
  role: "assistant" | "user";
  message: string;
  isStreaming?: boolean;
};

export const MessageCard = (props: MessagePropsType) => {
  const { role, message, isStreaming = false } = props;
  const [displayedText, setDisplayedText] = useState(isStreaming ? "" : message);
  const targetTextRef = useRef("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const wasStreamingRef = useRef(isStreaming);

  const renderWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <strong key={index}>{part.slice(1, -1)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    targetTextRef.current = message;
    if (!wasStreamingRef.current) {
      setDisplayedText(message);
    }
  }, [message, isStreaming]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDisplayedText((prevDisplayedText) => {
        const targetText = targetTextRef.current;

        if (prevDisplayedText.length === targetText.length) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return prevDisplayedText;
        }

        return targetText.substring(0, prevDisplayedText.length + 1);
      });
    }, 5);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      className={` text-lg max-lg:text-base  py-4  w-fit whitespace-pre-line break-words ${
        role === "user"
          ? "px-6 bg-green-700 text-white ml-auto rounded-l-4xl rounded-tr-4xl rounded-br-md max-w-lg shadow-xl"
          : ""
      }`}
    >
      {role === "assistant" ? (
        <div className="flex gap-3">
          <Sparkles size={25} className="text-green-800 shrink-0 mt-2 border border-green-600 rounded-full p-1 shadow-green-200 shadow-md" />
          <div>{renderWithBold(displayedText)}</div>
        </div>
      ) : (
        renderWithBold(displayedText)
      )}

      {isStreaming && role === "assistant" && <span className="blinking-cursor"></span>}
    </div>
  );
};
