// components/CTASection.tsx

"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react"; // Ikon untuk testimoni

// --- Data Dummy Testimoni ---
const testimonials = [
  {
    id: 1,
    name: "Wisatawan Lokal",
    quote:
      "Chatbot-nya sangat membantu! Saya bisa merencanakan liburan ke Majalengka dalam 5 menit.",
  },
  {
    id: 2,
    name: "Pengunjung Baru",
    quote: "Informasi destinasi wisatanya lengkap dan akurat. Keren banget!",
  },
  {
    id: 3,
    name: "Pecinta Kuliner",
    quote: "Nggak nyangka ada AI yang tahu kuliner tersembunyi. Saya jadi coba Serabi Oncom!",
  },
  {
    id: 4,
    name: "Mahasiswa",
    quote: "Saya pakai untuk cari info kesenian buat tugas. Jawabannya cepat dan relevan.",
  },
];

// --- Variasi Animasi ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// --- Variasi Animasi untuk Marquee ---
const marqueeVariants: Variants = {
  animate: {
    x: [0, -1000], // Sesuaikan '-1000' berdasarkan jumlah testimoni
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30, // Durasi 1x loop
        ease: "linear",
      },
    },
  },
};

export default function CtaSection() {
  // Kita duplikat testimoninya agar loop-nya mulus
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    // Kita beri ID "cta" dan gunakan mode gelap
    <section id="cta" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid 5 kolom: 2 untuk CTA, 3 untuk Marquee */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-center">
          {/* --- 1. Kolom CTA (Kiri) --- */}
          <motion.div
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="text-sm font-semibold text-green-400 uppercase">Asisten Virtual</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Masih Bingung?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Jangan buang waktu Anda mencari-cari. Biarkan asisten AI kami memberikan rekomendasi
              instan dan akurat untuk perjalanan Anda.
            </p>
            <Link
              href="/chat"
              className="mt-8 inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Tanya Asisten AI Sekarang
            </Link>
          </motion.div>

          {/* --- 2. Kolom Marquee Testimoni (Kanan) --- */}
          <motion.div
            className="md:col-span-3 h-96 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {/* Efek fade di pinggir (Opsional tapi keren) */}
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-900 to-transparent z-10" />

            {/* Kontainer Marquee */}
            <motion.div
              className="absolute top-0 left-0 flex space-x-6"
              variants={marqueeVariants}
              animate="animate"
            >
              {duplicatedTestimonials.map((item, index) => (
                // Kartu Testimoni
                <div
                  key={index}
                  className="w-80 h-auto flex-shrink-0 bg-white/5 
                             backdrop-blur-sm border border-white/10 
                             rounded-xl p-6 shadow-lg"
                >
                  <Quote className="w-8 h-8 text-green-400" />
                  <p className="mt-4 text-gray-200 text-lg italic">"{item.quote}"</p>
                  <p className="mt-4 font-semibold text-white">- {item.name}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
