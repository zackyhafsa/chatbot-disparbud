// components/ChatInput.tsx

"use client";

import { ArrowUp, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FormEvent, KeyboardEvent } from "react";
import { useState } from "react";
import Textarea from "react-textarea-autosize";

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

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
  };

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
          <AnimatePresence mode="wait">
            {thinking ? (
              <motion.button
                key="stop"
                type="button"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={stop}
                className="bg-red-500 text-white p-3 rounded-full 
                           flex items-center justify-center
                           hover:bg-red-600 transition-colors"
                aria-label="Hentikan"
              >
                <Square size={20} />
              </motion.button>
            ) : (
              <motion.button
                key="send"
                type="submit"
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                disabled={!input.trim() || thinking }
                className={`${!input.trim() || thinking ? "scale-0" : "scale-100 bg-green-700 text-white"} p-3 rounded-full flex items-center justify-center disabled:cursor-not-allowed hover:bg-green-800 transition-all duration-300 ease-in-out`}
                aria-label="Kirim"
              >
                <ArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
