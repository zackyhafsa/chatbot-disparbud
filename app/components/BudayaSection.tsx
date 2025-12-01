"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BudayaItem from "./BudayaItem";

gsap.registerPlugin(ScrollTrigger);

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

export default function BudayaSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".budaya-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".budaya-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="budaya" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="budaya-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-400 py-2">
            Kekayaan Budaya & Kesenian
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Warisan leluhur yang hidup dan lestari di "Kota Angin".
          </p>
        </div>
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
