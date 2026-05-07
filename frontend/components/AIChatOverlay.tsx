// components/ai-chat-overlay.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, User, X } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export default function AIChatOverlay() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Halo 👋 Ada yang bisa saya bantu?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");

    // Fake AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: `Kamu bilang: "${currentInput}"`,
        },
      ]);
    }, 700);
  }

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition hover:scale-105 active:scale-95"
      >
        <Bot size={24} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        >
          {/* CHAT BOX */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              absolute bottom-0 right-0
              flex h-[85vh] w-full flex-col overflow-hidden
              rounded-t-3xl bg-white shadow-2xl

              md:bottom-6 md:right-6
              md:h-[700px]
              md:max-w-[420px]
              md:rounded-3xl
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                  <Bot size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    AI Assistant
                  </h2>

                  <p className="text-xs text-green-500">
                    Online
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* MESSAGES */}
            <div
              className="
                chat-scroll
                flex-1 overflow-y-auto
                bg-[#f5f5f5]
                px-4 py-5
              "
            >
              <div className="space-y-5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[85%]
                        rounded-3xl
                        px-4 py-3
                        shadow-sm
                        break-words

                        ${
                          message.role === "user"
                            ? "rounded-br-md bg-black text-white"
                            : "rounded-bl-md border border-gray-200 bg-white text-gray-900"
                        }
                      `}
                    >
                      {/* ROLE */}
                      <div className="mb-2 flex items-center gap-2 text-xs opacity-70">
                        {message.role === "assistant" ? (
                          <>
                            <Bot size={13} />
                            AI
                          </>
                        ) : (
                          <>
                            <User size={13} />
                            You
                          </>
                        )}
                      </div>

                      {/* MESSAGE */}
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* INPUT */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="border-t border-gray-200 bg-white p-4"
            >
              <div
                className="
                  flex items-center gap-2
                  rounded-2xl
                  border-2 border-gray-200
                  bg-[#f7f7f7]
                  p-2
                  transition
                  focus-within:border-black
                "
              >
                <input
                  type="text"
                  placeholder="Tulis pesan..."
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  className="
                    flex-1 bg-transparent
                    px-3 py-2
                    text-sm text-black
                    placeholder:text-gray-400
                    outline-none
                  "
                />

                <button
                  type="submit"
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    bg-black text-white
                    transition
                    hover:scale-105
                    active:scale-95
                  "
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}