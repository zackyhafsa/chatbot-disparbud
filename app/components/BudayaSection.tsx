"use client";

import { motion, Variants } from "framer-motion";
import BudayaItem from "./BudayaItem";

const budayaData = [
  {
    id: 1,
    category: "Kebudayaan",
    title: "Rampak Genteng Jatiwangi",
    description:
      "Rampak Genteng Jatiwangi merupakan sebuah bentuk kesenian pertunjukan yang melibatkan banyak orang (rampak berarti serempak atau bersama-sama) dalam memainkan atau memanfaatkan genteng sebagai instrumen musik dan juga sebagai bagian dari koreografi atau gerakan tari.",
    imageUrl: "/rampak_genteng.webp",
    linkUrl: "#",
    isReversed: false,
  },
  {
    id: 2,
    category: "Kesenian",
    title: "Seni Tari Sampyong",
    description:
      "Seni Tari Sampyong Majalengka adalah kesenian tradisional berupa adu ketangkasan yang menggunakan tongkat rotan. Gerakan tariannya yang lincah dan atraktif disajikan dengan iringan musik tradisional, menciptakan perpaduan antara keindahan gerak dan demonstrasi keterampilan. Kesenian ini unik karena menampilkan simulasi pertarungan yang dinamis dan berenergi.",
    imageUrl: "/tari_sampyong.jpg",
    linkUrl: "#",
    isReversed: true,
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

export default function BudayaSection() {
  return (
    <section id="budaya" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-400 py-2">
            Kekayaan Budaya & Kesenian
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Warisan leluhur yang hidup dan lestari di "Kota Angin".
          </p>
        </motion.div>
        <div className="space-y-24 md:space-y-32">
          {budayaData.map((item) => (
            <BudayaItem
              key={item.id}
              category={item.category}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              linkUrl={item.title}
              isReversed={item.isReversed}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
