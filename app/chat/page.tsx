"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { MessageCard } from "../components/MessageCard";
import NoChat from "../components/NoChat";
import ThinkingIndicator from "../components/ThinkingIndicator";
import { Trash } from "lucide-react";
import ChatInput from "../components/ChatInput";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop, setMessages } = useChat();

  const hasLoadedFromStorage = useRef(false);

  useEffect(() => {
    if (!hasLoadedFromStorage.current) {
      const storedMessages = localStorage.getItem("chat-bot-kp");

      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
      hasLoadedFromStorage.current = true;
    }
  }, [setMessages]);

  useEffect(() => {
    if (hasLoadedFromStorage.current) {
      localStorage.setItem("chat-bot-kp", JSON.stringify(messages));
    }
  }, [messages]);

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

  const handleDeleteChat = () => {
    setMessages([]);
    localStorage.removeItem("chat-bot-kp");
  };

  return (
    <div
      className="flex justify-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <div className="flex flex-col w-full mt-25 mb-28 overflow-y-auto items-center  gap-3">
        <div className="flex justify-end w-[45%] max-lg:w-[70%] max-md:w-[90%]">
          {messages.length > 0 && (
            <button
              className="bg-red-500 text-white p-3 rounded-full cursor-pointer hover:bg-red-600 flex items-center gap-2"
              onClick={handleDeleteChat}
            >
              <Trash />
            </button>
          )}
        </div>
        <div className="flex-1 space-y-3 w-[45%] max-lg:w-[70%] max-md:w-[90%]">
          {messages.length === 0 && (
            <NoChat onExampleClick={(prompt) => sendMessage({ text: prompt })} />
          )}
          {messages.map((message, index) => {
            const messageText = message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("");

            const isLastMessage = index === messages.length - 1;
            const isStreaming = isLastMessage && message.role === "assistant" && thinking;

            return (
              <MessageCard
                key={message.id}
                role={message.role as "user" | "assistant"}
                message={messageText}
                isStreaming={isStreaming}
              />
            );
          })}

          {(() => {
            const lastMessage = messages[messages.length - 1];
            const isAssistantStreaming = lastMessage && lastMessage.role === "assistant";
            return thinking && !isAssistantStreaming && <ThinkingIndicator />;
          })()}

          {error && <MessageCard role="assistant" message="Terjadi kesalahan, coba ulangi lagi." />}
        </div>
        <div ref={bottomRef} />
        <ChatInput
          input={input}
          setInput={setInput}
          handleFormSubmit={handleFormSubmit}
          thinking={thinking}
          stop={stop}
        />
      </div>
    </div>
  );
}
