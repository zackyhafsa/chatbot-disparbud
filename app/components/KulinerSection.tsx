// components/KulinerSection.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
// 1. Impor ikon untuk tombol
import { ArrowRight } from "lucide-react";

// 2. Kita modifikasi data agar lebih kaya (sesuai desain baru)
const kulinerData = [
  {
    id: 1,
    title: "Jalakotek",
    description: "Kue sejenis pastel dengan isi tahu dan sayuran, digoreng renyah.",
    imageUrl: "/kuliner/jalakotek.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Pencok Katel",
    description: "Makanan dari kacang kedelai yang baru tumbuh, disantap mentah dengan sambal.",
    imageUrl: "/kuliner/pencok-katel.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Pepes Jeroan",
    description: "Jeroan ikan atau ayam yang dibumbui dan dimasak dengan cara dipepes.",
    imageUrl: "/kuliner/pepes-jeroan.jpg",
    link: "#",
  },
];

// --- Variasi Animasi (Tetap sama, sudah bagus) ---
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

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function KulinerSection() {
  return (
    // Kita ganti latar jadi 'bg-gray-50' untuk selang-seling
    <section id="kuliner" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Judul Section (Tetap sama) --- */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-400 py-1">
            Cita Rasa Khas Majalengka
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Manjakan lidah Anda dengan kuliner otentik "Kota Angin".
          </p>
        </motion.div>

        {/* --- Grid Kartu Kuliner (Di sinilah perubahannya) --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {kulinerData.map((item) => (
            <motion.div variants={fadeInUp} key={item.id}>
              {/* 'group' SANGAT PENTING untuk 'group-hover' */}
              <div className="relative h-96 rounded-2xl shadow-lg overflow-hidden group">
                {/* 1. Gambar Latar Belakang */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0 transition-transform duration-500 ease-in-out 
                             group-hover:scale-110" // Efek zoom saat hover
                />

                {/* 2. Judul Awal (Di atas Gradien) */}
                <div
                  className="absolute bottom-0 left-0 w-full p-6 
                             bg-gradient-to-t from-black/90 to-transparent
                             transition-all duration-500 ease-in-out
                             group-hover:translate-y-16 group-hover:opacity-0" // Akan slide ke bawah & hilang
                >
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>

                {/* 3. Panel Konten yang Tersembunyi */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-white flex flex-col justify-end transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 rounded-t-3xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center font-medium bg-gradient-to-r from-green-800 to-green-600 px-7 py-1 rounded-full text-white hover:bg-gradient-to-l hover:from-green-900 hover:to-green-700 ease-in-out duration-300 shadow-md self-start"
                  >
                    Lihat Detail
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
