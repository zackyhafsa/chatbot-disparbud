"use client";

import { motion, Variants } from "framer-motion";
import Button from "./Button";
import { slugify } from "../lib/utils";

const destinasiData = [
  {
    id: 1,
    title: "Terasering Panyaweuyan",
    description: "Nikmati pemandangan hamparan sawah terasering yang hijau dan menyejukkan mata.",
    imageUrl: "panyaweyan2.webp",
    link: "panyaweyan",
  },
  {
    id: 2,
    title: "Curug Muara Jaya",
    description: "Air terjun tertinggi di Majalengka dengan suasana alam yang asri dan sejuk.",
    imageUrl: "muara-jaya.jpg",
    link: "curug",
  },
  {
    id: 3,
    title: "Situ Cipanten",
    description: "Danau indah dengan air jernih berwarna biru kehijauan dan berbagai wahana air.",
    imageUrl: "cipanten2.jpg",
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
    <section id="destinasi" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="hover:bg-white focus:bg-white rounded-xl overflow-hidden flex flex-col group"
              variants={fadeInUp}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={destinasi.imageUrl}
                  alt={destinasi.title}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{destinasi.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{destinasi.description}</p>
                <Button link={`/detail/${slugify(destinasi.title)}`} label="Jelajahi Sekarang" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
