"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Wildan Zhilal Manafi",
    quote:
      "Chatbot-nya sangat membantu! Saya bisa merencanakan liburan ke Majalengka dalam 5 menit.",
  },
  {
    id: 2,
    name: "Tsaqib Ilham Nur",
    quote: "Informasi destinasi wisatanya lengkap dan akurat. Keren banget!",
  },
  {
    id: 3,
    name: "Irki Septian",
    quote: "Nggak nyangka ada AI yang tahu kuliner tersembunyi. Saya jadi coba Serabi Oncom!",
  },
  {
    id: 4,
    name: "Abrar Wahid",
    quote: "Saya pakai untuk cari info kesenian buat tugas. Jawabannya cepat dan relevan.",
  },
];

export default function CtaSection() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Fade In Up for Content
      gsap.fromTo(
        ".cta-content",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-content",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Fade In Up for Testimonials Container
      gsap.fromTo(
        ".cta-testimonials-container",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-testimonials-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Marquee Animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          ease: "none",
          duration: 40,
          repeat: -1,
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="cta" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 items-center">
          <div className="cta-content md:col-span-2">
            <span className="text-sm font-semibold text-green-400 uppercase">Asisten Virtual</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Masih Bingung?</h2>
            <p className="mt-4 text-lg text-gray-300">
              Jangan buang waktu Anda mencari-cari. Biarkan asisten AI kami memberikan rekomendasi
              instan dan akurat untuk perjalanan Anda.
            </p>
            <Link
              href="/chat"
              className="mt-8 inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Tanya Asisten AI Sekarang
            </Link>
          </div>

          <div className="cta-testimonials-container md:col-span-3 h-96 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10" />
            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-900 to-transparent z-10" />

            <div ref={marqueeRef} className="absolute top-0 left-0 flex space-x-6 w-max">
              {duplicatedTestimonials.map((item, index) => (
                <div
                  key={index}
                  className="w-80 h-auto flex-shrink-0 bg-white/5 
                             backdrop-blur-sm border border-white/10 
                             rounded-xl p-6 shadow-lg"
                >
                  <Quote className="w-8 h-8 text-green-400" />
                  <p className="mt-4 text-gray-200 text-lg italic">"{item.quote}"</p>
                  <p className="mt-4 font-semibold text-white">- {item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
