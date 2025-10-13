import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface NoChatProps {
  onExampleClick: (prompt: string) => void;
}

const NoChat: React.FC<NoChatProps> = ({ onExampleClick }) => {
  const examplePrompts = [
    "Apa saja wisata buatan yang ada di Majalengka?",
    "Saya ingin mencoba kuliner khas Majalengka, ada rekomendasi?",
    "Bagaimana rasa dari Gedong Gincu?",
    "Apa itu Kalua Jeruk.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full text-center text-gray-800 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-4" variants={itemVariants}>
        <Globe className="size-25 text-green-700" />
      </motion.div>
      <motion.h1
        className="text-2xl md:text-4xl pb-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-800"
        variants={itemVariants}
      >
        MajaGo
      </motion.h1>
      <motion.p
        className="mt-2 mb-8 text-sm md:text-base text-gray-800 font-semibold"
        variants={itemVariants}
      >
        Siap membantu Anda menjelajahi{" "}
        <span className="underline decoration-2 font-bold decoration-green-700">
          Keindahan Majalengka!
        </span>
      </motion.p>

      <motion.div className="w-full max-w-lg mx-auto" variants={containerVariants}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm">
          {examplePrompts.map((prompt, index) => (
            <motion.div
              key={index}
              onClick={() => onExampleClick(prompt)}
              className="bg-white/30 font-semibold backdrop-blur-sm p-4 rounded-xl border-2 hover:scale-105 border-green-700/80 hover:border-green-700 hover:border-2 hover:bg-white/80 transition-all ease-in-out duration-300 cursor-pointer text-left shadow-lg"
              variants={itemVariants}
            >
              {prompt}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoChat;
