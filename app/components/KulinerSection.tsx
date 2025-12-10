"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { slugify } from "../lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const kulinerData = [
  {
    id: 1,
    title: "Jalakotek",
    description: "Kue sejenis pastel dengan isi tahu dan sayuran, digoreng renyah hingga keemasan.",
    imageUrl: "/kuliner/jalakotek.jpg",
  },
  {
    id: 2,
    title: "Pencok Katel",
    description: "Makanan dari kacang kedelai yang baru tumbuh, disantap segar dengan sambal khas.",
    imageUrl: "/kuliner/pencok-katel.jpg",
  },
  {
    id: 3,
    title: "Hampas Kecap",
    description: "Hidangan unik dari ampas kedelai sisa pembuatan kecap dengan cita rasa gurih.",
    imageUrl: "/kuliner/hampas-kecap.jpg",
  },
];

export default function KulinerSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header animation
      gsap.fromTo(
        ".kuliner-header-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".kuliner-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        ".kuliner-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".kuliner-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="kuliner" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="kuliner-header mb-12 md:mb-16">
          <div className="kuliner-header-content flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-green-600 uppercase tracking-widest mb-3">
                Kuliner Khas
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-green-400 leading-tight">
                Cita Rasa Majalengka
              </h2>
            </div>
            <p className="text-gray-600 max-w-md text-base leading-relaxed">
              Manjakan lidah dengan kelezatan kuliner otentik dari "Kota Angin".
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="kuliner-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {kulinerData.map((item, index) => (
            <Link
              key={item.id}
              href={`/detail/${slugify(item.title)}`}
              className="kuliner-card group block"
            >
              <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-colors duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                  />
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
                      0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-gray-400 group-hover:text-green-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1"
                    />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-12">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-green-700 hover:text-green-800 transition-colors duration-300 group"
          >
            <span>Tanyakan kuliner lainnya ke AI</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
