"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { slugify } from "../lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const kulinerData = [
  {
    id: 1,
    title: "Jalakotek",
    description: "Kue sejenis pastel dengan isi tahu dan sayuran, digoreng renyah.",
    imageUrl: "/kuliner/jalakotek.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Pencok Katel",
    description: "Makanan dari kacang kedelai yang baru tumbuh, disantap mentah dengan sambal.",
    imageUrl: "/kuliner/pencok-katel.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Hampas Kecap",
    description:
      "Hampas Kecap adalah hidangan unik khas Majalengka yang terbuat dari ampas (sisa) kedelai dari proses pembuatan kecap.",
    imageUrl: "/kuliner/hampas-kecap.jpg",
    link: "#",
  },
];

export default function KulinerSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        ".kuliner-header",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.inOut",
        }
      );

      tl.fromTo(
        ".kuliner-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          ease: "power3.inOut",
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="kuliner" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className=" text-center mb-12">
          <h2 className="kuliner-header text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-green-400 py-1">
            Cita Rasa Khas Majalengka
          </h2>
          <p className="kuliner-header mt-4 text-lg text-gray-600">
            Manjakan lidah Anda dengan kuliner otentik "Kota Angin".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kulinerData.map((item) => (
            <div key={item.id} className="kuliner-card">
              <div className="relative h-96 rounded-2xl shadow-lg overflow-hidden group">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="absolute inset-0 transition-transform duration-500 ease-in-out 
                             group-hover:scale-110 object-cover"
                />

                <div
                  className="absolute bottom-0 left-0 w-full p-6 
                             bg-gradient-to-t from-black/90 to-transparent
                             transition-all duration-500 ease-in-out
                             group-hover:translate-y-16 group-hover:opacity-0"
                >
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>
                {/* hidden element */}
                <div className="absolute bottom-0 left-0 w-full p-6 bg-white flex flex-col justify-end transform translate-y-full transition-transform duration-500 ease-in-out group-hover:translate-y-0 rounded-t-3xl group-active:translate-y-0">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <Link
                    href={`/detail/${slugify(item.title)}`}
                    className="inline-flex items-center font-medium bg-gradient-to-r from-green-800 to-green-600 px-7 py-1 rounded-full text-white hover:bg-gradient-to-l hover:from-green-900 hover:to-green-700 ease-in-out duration-300 shadow-md self-start"
                  >
                    Lihat Detail
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
