import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Compass, MapPin, Utensils, Music } from "lucide-react";
import React, { useRef } from "react";

interface NoChatProps {
  onExampleClick: (prompt: string) => void;
}

const NoChat: React.FC<NoChatProps> = ({ onExampleClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".no-chat-icon",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 }
      )
        .fromTo(
          ".no-chat-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          ".no-chat-subtitle",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          ".no-chat-card",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 },
          "-=0.2"
        );
    },
    { scope: containerRef }
  );

  const examplePrompts = [
    {
      icon: Utensils,
      text: "Kuliner khas apa yang wajib dicoba di Majalengka?",
    },
    {
      icon: MapPin,
      text: "Rekomendasi wisata alam di Majalengka",
    },
    {
      icon: Music,
      text: "Kesenian tradisional yang ada di Majalengka",
    },
    {
      icon: Compass,
      text: "Itinerary 2 hari di Majalengka",
    },
  ];

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-full px-4 py-12">
      {/* Icon */}
      <div className="no-chat-icon w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
        <Compass className="w-7 h-7 text-gray-700" />
      </div>

      {/* Title */}
      <h1 className="no-chat-title text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
        Asisten Wisata Majalengka
      </h1>

      {/* Subtitle */}
      <p className="no-chat-subtitle text-gray-500 text-center max-w-md mb-10">
        Tanyakan apapun tentang destinasi, kuliner, dan budaya Majalengka
      </p>

      {/* Prompt Cards */}
      <div className="w-full max-w-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {examplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onExampleClick(prompt.text)}
              className="no-chat-card group flex items-start gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 hover:border-green-300 transition-all duration-300 text-left active:scale-[0.98]"
            >
              <prompt.icon className="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0 mt-0.5 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1 transition-colors">
                {prompt.text}
              </span>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChat;
