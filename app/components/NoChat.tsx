import { Globe } from "lucide-react";
import Image from "next/image";
import React from "react";

interface NoChatProps {
  onExampleClick: (prompt: string) => void;
}

const NoChat: React.FC<NoChatProps> = ({ onExampleClick }) => {
  const examplePrompts = [
    "Rekomendasi curug terindah di Majalengka?",
    "Tempat makan khas Sunda di Majalengka yang enak di mana?",
    "Event budaya apa yang akan datang?",
    "Bagaimana cara menuju Terasering Panyaweuyan?",
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-800 px-4">
      <div className="mb-4">
        <Globe className="size-25 text-green-700" />
      </div>
      <h1 className="text-2xl md:text-4xl pb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-400">
        Asisten Wisata Majalengka
      </h1>
      <p className="mt-2 mb-8 text-sm md:text-base text-gray-800 font-semibold">
        Siap membantu Anda menjelajahi <span className="underline decoration-2 font-bold decoration-green-700">Keindahan Majalengka!</span>
      </p>

      <div className="w-full max-w-lg mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
          {examplePrompts.map((prompt, index) => (
            <div
              key={index}
              onClick={() => onExampleClick(prompt)}
              className="bg-white/30 font-semibold backdrop-blur-sm p-4 rounded-xl border-2 hover:scale-105 border-green-700/80 hover:border-green-700 hover:border-2 hover:bg-white/80 transition-all ease-in-out duration-300 cursor-pointer text-left shadow-lg"
            >
              {prompt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChat;
