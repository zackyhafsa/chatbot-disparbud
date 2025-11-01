"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Button from "./Button";

interface BudayaItemProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  isReversed?: boolean;
}

export default function BudayaItem({
  category,
  title,
  description,
  imageUrl,
  linkUrl,
  isReversed = false,
}: BudayaItemProps) {
  const textVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isReversed ? 100 : -100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-10 gap-10 items-center min-h-[450px]">
      <motion.div
        className={`relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl 
                   md:col-span-6 ${isReversed ? "md:col-start-5" : "md:col-start-1"}
                   md:row-start-1`}
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>

      <motion.div
        className={`relative z-10 flex flex-col justify-center h-full
                   md:col-span-4 ${isReversed ? "md:col-start-1 md:text-right" : "md:col-start-7"}
                   md:row-start-1`}
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className={isReversed ? "md:items-end" : "md:items-start"}>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-2 text-4xl font-bold text-gray-900">{title}</h3>
          <p className="mt-4 text-gray-600 text-lg max-w-lg">{description}</p>
          <Button link={linkUrl} label="Pelajari Selengkapnya" className="mt-6" />
        </div>
      </motion.div>
    </div>
  );
}
