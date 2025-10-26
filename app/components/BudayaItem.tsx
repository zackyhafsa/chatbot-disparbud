// components/BudayaItem.tsx

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// Animasi tetap sama, tidak diubah
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  // --- TIDAK ADA YANG DIUBAH DI BAGIAN LOGIKA ANIMASI INI ---
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const textX = useTransform(scrollYProgress, [0, 0.5], isReversed ? [100, 0] : [-100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  // --- AKHIR BAGIAN LOGIKA ANIMASI ---

  // --- KITA HANYA MENGUBAH BAGIAN DESAIN (RETURN) DI BAWAH INI ---
  return (
    <motion.div
      ref={ref}
      // Gunakan grid 10 kolom untuk layout asimetris
      className="relative grid grid-cols-1 md:grid-cols-10 gap-10 items-center min-h-[450px]"
    >
      {/* 1. Kolom Gambar (6 kolom) */}
      <motion.div
        className={`relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl 
                   md:col-span-6 ${isReversed ? "md:col-start-5" : "md:col-start-1"}
                   md:row-start-1`} // Pastikan gambar selalu di grid row 1
        style={{
          scale: imageScale, // Animasi scale tetap dipakai
          opacity: textOpacity, // Tambahkan fade-in untuk gambar
        }}
      >
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
        {/* Hapus overlay gelap agar gambar lebih cerah */}
      </motion.div>

      {/* 2. Kolom Teks (4 kolom) */}
      <motion.div
        className={`relative z-10 flex flex-col justify-center h-full
                   md:col-span-4 ${isReversed ? "md:col-start-1 md:text-right" : "md:col-start-7"}
                   md:row-start-1`} // Pastikan teks juga di grid row 1
        style={{
          x: textX, // Animasi slide tetap dipakai
          opacity: textOpacity, // Animasi fade tetap dipakai
        }}
      >
        {/* Wrapper untuk text-align */}
        <div className={isReversed ? "md:items-end" : "md:items-start"}>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-2 text-4xl font-bold text-gray-900">{title}</h3>
          <p className="mt-4 text-gray-600 text-lg max-w-lg">{description}</p>
          <Button link={linkUrl} label="Pelajari Lebih Lanjut" className="mt-8" />
        </div>
      </motion.div>
    </motion.div>
  );
}
