import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type MessagePropsType = {
  role: "assistant" | "user";
  message: string;
  isStreaming?: boolean;
};

export const MessageCard = (props: MessagePropsType) => {
  const { role, message, isStreaming = false } = props;
  const [shouldAnimate, setShouldAnimate] = useState(isStreaming);

  useEffect(() => {
    if (isStreaming) {
      setShouldAnimate(true);
    }
  }, [isStreaming]);

  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".user-message",
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      }
    );
  });

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

  return (
    <div
      className={` text-lg max-lg:text-base  py-4  w-fit whitespace-pre-line break-words ${
        role === "user"
          ? "user-message px-6 bg-green-700 text-white ml-auto rounded-l-4xl rounded-tr-4xl rounded-br-md max-w-lg shadow-xl max-md:rounded-l-3xl max-md:rounded-tr-3xl max-md:rounded-br-md max-md:p-4"
          : ""
      }`}
    >
      {role === "assistant" ? (
        <div className="flex gap-3">
          <Sparkles
            size={30}
            className="text-green-800 shrink-0 mt-2 border border-green-600 rounded-full p-1 shadow-green-200 shadow-md"
          />
          <div
            style={{
              opacity: shouldAnimate ? 0 : 1,
              animation: shouldAnimate ? "fadeIn 0.5s ease-out forwards" : "none",
            }}
          >
            {renderWithBold(message)}
          </div>
        </div>
      ) : (
        renderWithBold(message)
      )}

      {isStreaming && role === "assistant" && <span className="blinking-cursor"></span>}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
