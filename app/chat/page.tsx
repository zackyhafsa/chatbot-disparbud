"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { MessageCard } from "../components/MessageCard";
import NoChat from "../components/NoChat";
import ThinkingIndicator from "../components/ThinkingIndicator";
import { Trash2 } from "lucide-react";
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
    stop();
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-white">
      <div className="flex flex-col w-full max-w-3xl mx-auto pt-24 pb-32 px-4">
        {/* Header with delete button */}
        {messages.length > 0 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleDeleteChat}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 size={16} />
              <span>Hapus Chat</span>
            </button>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 space-y-6">
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

          {error && (
            <MessageCard role="assistant" message="Terjadi kesalahan, silakan coba lagi." />
          )}
        </div>

        <div ref={bottomRef} />

        {/* Chat Input */}
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
