"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { slugify } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const budayaData = [
  {
    id: 1,
    category: "Kebudayaan",
    title: "Rampak Genteng Jatiwangi",
    description:
      "Kesenian pertunjukan yang melibatkan banyak orang dalam memainkan genteng sebagai instrumen musik dan bagian dari koreografi tari.",
    imageUrl: "/rampak_genteng.webp",
  },
  {
    id: 2,
    category: "Kesenian",
    title: "Seni Tari Sampyong",
    description:
      "Kesenian tradisional berupa adu ketangkasan menggunakan tongkat rotan dengan gerakan lincah dan atraktif diiringi musik tradisional.",
    imageUrl: "/tari_sampyong.jpg",
  },
];

export default function BudayaSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header animation
      gsap.fromTo(
        ".budaya-header-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".budaya-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        ".budaya-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".budaya-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="budaya" className="py-20 md:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="budaya-header mb-12 md:mb-16">
          <div className="budaya-header-content flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-stone-500 uppercase tracking-widest mb-3">
                Warisan Leluhur
              </p>
              <h2 className="text-3xl md:text-4xl  font-semibold text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-green-400 leading-tight">
                Budaya & Kesenian
              </h2>
            </div>
            <p className="text-stone-600 max-w-md text-base leading-relaxed">
              Menjelajahi kekayaan tradisi yang hidup dan lestari di Majalengka.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="budaya-cards space-y-6">
          {budayaData.map((item, index) => (
            <div key={item.id} className="budaya-card group block">
              <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-colors duration-300">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div
                    className={`relative w-full md:w-2/5 h-64 md:h-80 overflow-hidden ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 p-6 md:p-10 flex flex-col justify-center ${
                      index % 2 === 1 ? "md:order-1" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <span className="w-8 h-px bg-stone-300" />
                      <span className="text-xs text-stone-400">0{index + 1}</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-semibold text-stone-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-sky-600 group-hover:to-green-400 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-stone-600 leading-relaxed mb-6 max-w-lg">
                      {item.description}
                    </p>

                    <Link
                      href={`/detail/${slugify(item.title)}`}
                      className="flex items-center gap-2 text-stone-900 font-medium group/link "
                    >
                      <span className="text-sm">Selengkapnya</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
