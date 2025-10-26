"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

const destinasiData = [
  {
    id: 1,
    title: "Terasering Panyaweuyan",
    description: "Nikmati pemandangan hamparan sawah terasering yang hijau dan menyejukkan mata.",
    imageUrl:
      "https://cdn1.katadata.co.id/media/images/thumb/2021/08/16/Terasering_Panyaweuyan-2021_08_16-16_27_29_449c789040b4e44c07a3ee7ace04464f_960x640_thumb.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Curug Muara Jaya",
    description: "Air terjun tertinggi di Majalengka dengan suasana alam yang asri dan sejuk.",
    imageUrl:
      "https://travelspromo.com/wp-content/uploads/2020/03/11-tersorot-matahari-Fitria-Natasya-Putri.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Situ Cipanten",
    description: "Danau indah dengan air jernih berwarna biru kehijauan dan berbagai wahana air.",
    imageUrl:
      "https://asset.kompas.com/crops/1u75ED0Gblk6gSnuejkqyp82R5k=/1x17:974x666/750x500/data/photo/2022/06/02/62985ff92ab3f.jpg",
    link: "#",
  },
];

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function DestinasiSection() {
  return (
    // Kita beri ID "destinasi" agar link di Navbar berfungsi
    <section id="destinasi" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Judul Section --- */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-400">
            Destinasi Populer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Jelajahi keindahan alam ikonik yang ada di Majalengka.
          </p>
        </motion.div>

        {/* --- Grid Kartu Destinasi --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {destinasiData.map((destinasi) => (
            <motion.div
              key={destinasi.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group"
              variants={fadeInUp} // Setiap kartu akan menggunakan animasi fadeInUp
              whileHover={{
                y: -8, // Efek terangkat saat di-hover
                scale: 1.03, // Sedikit membesar
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Gambar Kartu */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={destinasi.imageUrl}
                  alt={destinasi.title}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              {/* Konten Kartu */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{destinasi.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{destinasi.description}</p>
                <Button link={destinasi.link} label="Jelajahi Sekarang" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
