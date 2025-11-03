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
    <section id="destinasi" className="py-24 bg-gray-50 lg:h-screen">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {destinasiData.map((destinasi) => (
            <motion.div
              key={destinasi.id}
              className="hover:bg-white p-4 active:bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 ease-in-out"
              variants={fadeInUp}
            >
              <div className="relative h-56 w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out">
                <img
                  src={destinasi.imageUrl}
                  alt={destinasi.title}
                  className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>

              <div className=" pt-3  flex flex-col transition-all duration-500 ease-in-out">
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
