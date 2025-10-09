"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { MessageCard } from "./components/MessageCard";
import NoChat from "./components/NoChat";
import ThinkingIndicator from "./components/ThinkingIndicator";
import { Loader, SendHorizontal } from "lucide-react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const thinking = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || thinking) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div
      className="flex justify-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <div className="flex flex-col w-full mt-10 mb-28 overflow-y-auto items-center  gap-3">
        <div className="flex-1 space-y-3 w-[35%]">
          {messages.length === 0 && (
            <NoChat onExampleClick={(prompt) => sendMessage({ text: prompt })} />
          )}
          {messages.map((message) => {
            const messageText = message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("");

            return (
              <MessageCard
                key={message.id}
                role={message.role as "user" | "assistant"}
                message={messageText}
              />
            );
          })}
          {thinking && <ThinkingIndicator />}
          {error && <MessageCard role="assistant" message="Terjadi kesalahan, coba ulangi lagi." />}
        </div>
        <div ref={bottomRef} />
        <div className="fixed right-0 left-0 bottom-10">
          <form
            onSubmit={handleFormSubmit}
            className="border-gray-300 border w-[40%] max-lg:w-[70%] max-md:w-[90%] flex mx-auto bg-white p-2 rounded-full shadow-md items-center"
          >
            <textarea
              className=" w-full p-2 text-lg resize-none rounded-2xl focus:outline-none max-h-40 overflow-hidden"
              value={input}
              placeholder="Say something..."
              rows={1}
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFormSubmit(e);
                }
              }}
            />
            <button
              className={`bg-green-700 p-3 rounded-full ${
                !input.trim() || thinking ? "opacity-50" : ""
              }`}
              type="submit"
              disabled={!input.trim()}
            >
              {thinking ? (
                <Loader className="text-white animate-spin" onClick={() => stop()} />
              ) : (
                <SendHorizontal className="text-white" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
