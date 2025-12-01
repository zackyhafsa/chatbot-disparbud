import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Globe } from "lucide-react";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface NoChatProps {
  onExampleClick: (prompt: string) => void;
}

const NoChat: React.FC<NoChatProps> = ({ onExampleClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".no-chat-header",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power3.inOut",
        duration: 0.8,
        stagger: 0.1,
      }
    );
  });

  const examplePrompts = [
    "Apa saja makanan yang sering dijumpai di Majalengka?",
    "Ada Wisata apa saja yang ada di Majalengka?",
    "Kebudayaan yang masih Lestari di Majalengka",
    "Apa saja kesenian yang ada di Majalengka?",
  ];

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center h-full text-center text-gray-800 px-4"
    >
      <div className="no-chat-header mb-4">
        <Globe className="size-25 text-green-700" />
      </div>
      <h1 className="no-chat-header text-2xl md:text-4xl pb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-800">
        MajaGo
      </h1>
      <p className=" no-chat-header mt-2 mb-8 text-sm md:text-base text-gray-800 font-semibold">
        Siap membantu Anda menjelajahi{" "}
        <span className="underline decoration-2 font-bold decoration-green-700">
          Keindahan Majalengka!
        </span>
      </p>

      <div className="w-full max-w-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
          {examplePrompts.map((prompt, index) => (
            <div key={index} onClick={() => onExampleClick(prompt)} className="no-chat-header">
              <div className="bg-white/30 font-semibold backdrop-blur-sm p-4 rounded-xl border-2 hover:scale-105 border-green-700/80 hover:border-green-700 hover:border-2 hover:bg-white/80 transition-all ease-in-out duration-300 cursor-pointer text-left shadow-lg">
                {prompt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChat;
