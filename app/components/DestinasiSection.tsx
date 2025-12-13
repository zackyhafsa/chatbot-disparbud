"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin } from "lucide-react";
import { slugify } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

const destinasiData = [
  {
    id: 1,
    title: "Terasering Panyaweuyan",
    description:
      "Hamparan sawah terasering yang hijau dan menyejukkan mata di kaki Gunung Ciremai.",
    imageUrl: "/destinasi/panyaweyan2.webp",
    location: "Argapura",
  },
  {
    id: 2,
    title: "Curug Muara Jaya",
    description: "Air terjun tertinggi di Majalengka dengan suasana alam yang asri dan sejuk.",
    imageUrl: "/destinasi/muara-jaya.jpg",
    location: "Argapura",
  },
  {
    id: 3,
    title: "Situ Cipanten",
    description: "Danau indah dengan air jernih biru kehijauan dan berbagai wahana air seru.",
    imageUrl: "/destinasi/cipanten2.jpg",
    location: "Maja",
  },
];

export default function DestinasiSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Header animation
      gsap.fromTo(
        ".destinasi-header-content",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".destinasi-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Cards animation
      gsap.fromTo(
        ".destinasi-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".destinasi-cards",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Featured card animation
      gsap.fromTo(
        ".destinasi-featured",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".destinasi-featured",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const featuredItem = destinasiData[0];
  const otherItems = destinasiData.slice(1);

  return (
    <section ref={containerRef} id="destinasi" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="destinasi-header mb-12 md:mb-16">
          <div className="destinasi-header-content flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-green-600 uppercase tracking-widest mb-3">
                Destinasi Wisata
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-linear-to-r from-sky-600 to-green-400 leading-tight">
                Jelajahi Majalengka
              </h2>
            </div>
            <p className="text-gray-600 max-w-md text-base leading-relaxed">
              Temukan keindahan alam dan pesona wisata ikonik di "Kota Angin".
            </p>
          </div>
        </div>

        {/* Featured + Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Card */}
          <Link
            href={`/detail/${slugify(featuredItem.title)}`}
            className="destinasi-featured group block lg:row-span-2"
          >
            <div className="relative h-full min-h-[400px] lg:min-h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-colors duration-300">
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={featuredItem.imageUrl}
                  alt={featuredItem.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                  <MapPin size={14} />
                  <span>{featuredItem.location}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                  {featuredItem.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md mb-4">
                  {featuredItem.description}
                </p>
                <div className="flex items-center gap-2 text-white font-medium group/link">
                  <span className="text-sm">Jelajahi</span>
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>

              {/* Number Badge */}
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium text-white">
                  01
                </span>
              </div>
            </div>
          </Link>

          {/* Other Cards */}
          <div className="destinasi-cards flex flex-col gap-6">
            {otherItems.map((item, index) => (
              <Link
                key={item.id}
                href={`/detail/${slugify(item.title)}`}
                className="destinasi-card group block"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-green-200 transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative w-full sm:w-2/5 h-48 sm:h-auto sm:min-h-[180px] overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                      />
                      {/* Number Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700">
                          0{index + 2}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <ArrowUpRight
                          size={16}
                          className="shrink-0 text-gray-400 group-hover:text-green-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1"
                        />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-12">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-green-700 hover:text-green-800 transition-colors duration-300 group"
          >
            <span>Temukan destinasi lainnya dengan AI</span>
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
