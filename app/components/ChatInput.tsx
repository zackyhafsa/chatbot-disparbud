// components/ChatInput.tsx

"use client";

import { ArrowUp, Square } from "lucide-react";
import { useRef, useState } from "react";
import { FormEvent, KeyboardEvent } from "react";
import Textarea from "react-textarea-autosize";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>) => void;
  thinking: boolean;
  stop: () => void;
}

export default function ChatInput({
  input,
  setInput,
  handleFormSubmit,
  thinking,
  stop,
}: ChatInputProps) {
  const [isMultiline, setIsMultiline] = useState(false);
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    const lines = e.target.value.split("\n").length;
    setIsMultiline(lines > 1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  };

  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    if (thinking && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [thinking]);

  useGSAP(() => {
    if (!thinking && buttonRef.current) {
      if (input.trim()) {
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.4,
          ease: "back.out(1.7)",
        });
      } else {
        gsap.to(buttonRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      }
    }
  }, [input, thinking]);

  return (
    <div className="fixed right-0 left-0 bottom-0 py-4 bg-transparent">
      <form
        onSubmit={handleFormSubmit}
        className="border-gray-200 border w-[50%] max-lg:w-[70%] max-md:w-[90%] 
                   flex mx-auto bg-white/80 backdrop-blur-sm 
                   p-2 rounded-3xl shadow-2xl items-end"
      >
        <Textarea
          className="w-full p-2.5 text-lg resize-none rounded-2xl 
                     focus:outline-none bg-transparent
                     max-h-40 overflow-y-auto"
          value={input}
          placeholder="Ketik pesan Anda..."
          rows={1}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
        />

        <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
          {thinking ? (
            <button
              ref={buttonRef}
              type="button"
              onClick={stop}
              className="bg-red-500 text-white p-3 rounded-full 
                           flex items-center justify-center
                           hover:bg-red-600 transition-colors active:scale-95"
              aria-label="Hentikan"
            >
              <Square size={20} />
            </button>
          ) : (
            <button
              ref={buttonRef}
              type="submit"
              disabled={!input.trim() || thinking}
              className={`bg-green-700 text-white p-3 rounded-full flex items-center justify-center disabled:cursor-not-allowed hover:bg-green-800 transition-colors scale-0 opacity-0 active:scale-95`}
              aria-label="Kirim"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
