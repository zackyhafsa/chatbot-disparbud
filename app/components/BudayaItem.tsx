"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { slugify } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface BudayaItemProps {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  isReversed?: boolean;
}

export default function BudayaItem({
  category,
  title,
  description,
  imageUrl,
  linkUrl,
  isReversed = false,
}: BudayaItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".budaya-image",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      ).fromTo(
        ".budaya-text",
        { y: isReversed ? -50 : 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-1 md:grid-cols-10 gap-10 items-center min-h-[450px]"
    >
      <div
        className={`budaya-image relative w-full h-[450px] rounded-2xl overflow-hidden shadow-xl 
                   md:col-span-6 ${isReversed ? "md:col-start-5" : "md:col-start-1"}
                   md:row-start-1`}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div
        className={`budaya-text relative z-10 flex flex-col justify-center h-full
                   md:col-span-4 ${isReversed ? "md:col-start-1 md:text-right" : "md:col-start-7"}
                   md:row-start-1`}
      >
        <div className={isReversed ? "md:items-end" : "md:items-start"}>
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
            {category}
          </span>
          <h3 className="mt-2 text-4xl font-bold text-gray-900">{title}</h3>
          <p className="mt-4 text-gray-600 text-lg max-w-lg">{description}</p>
          <Button
            link={`/detail/${slugify(linkUrl)}`}
            label="Pelajari Selengkapnya"
            className="mt-6"
          />
        </div>
      </div>
    </div>
  );
}
