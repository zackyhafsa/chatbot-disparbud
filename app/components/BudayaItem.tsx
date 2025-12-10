"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { slugify } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface BudayaItemProps {
  index: number;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  isReversed?: boolean;
}

export default function BudayaItem({
  index,
  category,
  title,
  description,
  imageUrl,
  linkUrl,
  isReversed = false,
}: BudayaItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Image container animation with parallax
      tl.fromTo(
        ".budaya-image-container",
        {
          x: isReversed ? 100 : -100,
          opacity: 0,
          rotateY: isReversed ? -15 : 15,
        },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      )
        // Decorative elements
        .fromTo(
          ".budaya-decoration",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.8"
        )
        // Category badge
        .fromTo(
          ".budaya-category",
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.6"
        )
        // Title with split effect
        .fromTo(
          ".budaya-title",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        // Description
        .fromTo(
          ".budaya-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        // Button
        .fromTo(
          ".budaya-button",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.3"
        )
        // Number decoration
        .fromTo(
          ".budaya-number",
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.8"
        );

      // Parallax effect on image
      gsap.to(".budaya-image-inner", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Large Number Decoration */}
      <div
        className={`budaya-number absolute -top-8 ${
          isReversed ? "lg:right-0" : "lg:left-0"
        } text-[180px] font-black text-amber-100/50 select-none pointer-events-none hidden lg:block z-0`}
      >
        0{index + 1}
      </div>

      {/* Image Section */}
      <div
        className={`budaya-image-container lg:col-span-7 ${
          isReversed ? "lg:col-start-6 lg:order-2" : "lg:col-start-1 lg:order-1"
        } relative z-10`}
      >
        <div className="relative group" ref={imageRef}>
          {/* Decorative frame */}
          <div
            className={`budaya-decoration absolute -inset-4 bg-linear-to-br from-amber-400/20 via-orange-300/20 to-red-400/20 rounded-3xl blur-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-80`}
          />

          {/* Corner decorations */}
          <div
            className={`budaya-decoration absolute ${
              isReversed ? "-right-3 -top-3" : "-left-3 -top-3"
            } w-16 h-16 border-t-4 border-l-4 border-amber-500 rounded-tl-2xl`}
          />
          <div
            className={`budaya-decoration absolute ${
              isReversed ? "-left-3 -bottom-3" : "-right-3 -bottom-3"
            } w-16 h-16 border-b-4 border-r-4 border-orange-500 rounded-br-2xl`}
          />

          {/* Main Image Container */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <div className="budaya-image-inner absolute inset-0 scale-110">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

            {/* Floating badge on image */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                <span className="text-sm font-semibold text-amber-700 flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  {category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`lg:col-span-5 ${
          isReversed ? "lg:col-start-1 lg:order-1 lg:text-right" : "lg:col-start-8 lg:order-2"
        } relative z-10`}
      >
        <div
          className={`flex flex-col ${isReversed ? "lg:items-end" : "lg:items-start"} space-y-6`}
        >
          {/* Category Tag */}
          <div
            className={`budaya-category inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r ${
              isReversed
                ? "from-orange-100 to-amber-100 border-orange-200"
                : "from-amber-100 to-orange-100 border-amber-200"
            } border`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="budaya-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p
            className={`budaya-description text-gray-600 text-base md:text-lg leading-relaxed ${
              isReversed ? "lg:text-right" : ""
            }`}
          >
            {description}
          </p>

          {/* CTA Button */}
          <Link
            href={`/detail/${slugify(linkUrl)}`}
            className={`budaya-button group/btn inline-flex items-center gap-3 px-8 py-4 
                       bg-linear-to-r from-amber-500 to-orange-500 
                       hover:from-amber-600 hover:to-orange-600
                       text-white font-semibold rounded-full 
                       shadow-lg shadow-amber-500/25 
                       hover:shadow-xl hover:shadow-amber-500/30 
                       transform hover:-translate-y-1 active:scale-95
                       transition-all duration-300`}
          >
            <span>Pelajari Selengkapnya</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
