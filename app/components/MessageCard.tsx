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
    if (!isStreaming) {
      setDisplayedText(message);
      targetTextRef.current = message;
    } else {
      targetTextRef.current = message;
    }
  }, [message, isStreaming]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDisplayedText((prevDisplayedText) => {
        const targetText = targetTextRef.current;

        if (prevDisplayedText.length === targetText.length) {
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
      className={` px-6 text-lg max-lg:text-base shadow-xl py-4 max-w-lg w-fit whitespace-pre-line break-words ${
        role === "user"
          ? "bg-green-700 text-white ml-auto rounded-b-4xl rounded-tl-4xl rounded-tr-md"
          : "bg-white rounded-b-4xl rounded-tr-4xl rounded-tl-md"
      }`}
    >
      {renderWithBold(displayedText)}

      {isStreaming && role === "assistant" && <span className="blinking-cursor"></span>}
    </div>
  );
};
