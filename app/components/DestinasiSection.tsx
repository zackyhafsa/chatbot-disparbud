"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";
import { slugify } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

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

export default function DestinasiSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".destinasi-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        }
      ).fromTo(
        ".destinasi-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.4,
          ease: "power3.out",
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="destinasi" className="py-24 bg-gray-50 lg:h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="destinasi-header text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-400">
            Destinasi Populer
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Jelajahi keindahan alam ikonik yang ada di Majalengka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {destinasiData.map((destinasi) => (
            <div key={destinasi.id} className="destinasi-card">
              <div className="h-full hover:bg-white p-4 active:bg-white rounded-3xl overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 ease-in-out">
                <div className="relative h-56 w-full overflow-hidden rounded-xl transition-all duration-500 ease-in-out">
                  <img
                    src={destinasi.imageUrl}
                    alt={destinasi.title}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110 group-active:scale-110"
                  />
                </div>{" "}
                <div className=" pt-3  flex flex-col transition-all duration-500 ease-in-out">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{destinasi.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{destinasi.description}</p>
                  <Button link={`/detail/${slugify(destinasi.title)}`} label="Jelajahi Sekarang" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
