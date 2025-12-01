"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type ImageItem = { src: string; alt: string };

const IMAGES: ImageItem[] = [
  {
    src: "panyaweyan.jpg",
    alt: "Panyaweyan Majalengka",
  },
  {
    src: "liwet.jpeg",
    alt: "Kuliner Majalengka",
  },
  {
    src: "cipanten.jpeg",
    alt: "Cipanten",
  },
  {
    src: "kuliner/jalakotek.jpg",
    alt: "Jalakotek",
  },
  {
    src: "kebudayaan.jpg",
    alt: "Kebudayaan Majalengka",
  },
];

export default function HeroTravel() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
      })
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
          },
          "-=0.4"
        )
        .from(
          ".hero-image-item",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          ".hero-decoration",
          {
            opacity: 0,
            scale: 0,
            duration: 1,
            stagger: 0.2,
          },
          "-=1"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[rgb(248,251,255)]"
      id="home"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-100/60 blur-2xl " />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl " />
      </div>

      <div className="mx-[8%] px-6 py-16 lg:py-72 lg:h-screen flex items-center max-lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <h1 className="hero-title text-balance text-4xl font-bold leading-tight text-gray-800 tracking-tight sm:text-5xl md:text-6xl max-lg:text-center ">
              Jelajahi{" "}
              <span className="bg-gradient-to-r from-sky-500 to-green-600 bg-clip-text text-transparent">
                Kuliner, Budaya dan Kesenian
              </span>{" "}
              di Majalengka
            </h1>

            <p className="hero-desc mt-4 text-pretty text-neutral-600 sm:text-lg max-lg:text-center">
              Plan and book your perfect trip with expert advice, travel tips, destination info, and
              inspiration from us.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 240 120"
              className="hero-decoration absolute -right-12 top-24 hidden h-24 w-40 text-yellow-400 lg:block"
            >
              <path
                d="M5 5 C120 20, 120 100, 235 110"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
            </svg>

            {/* CTA Button */}
            <div className=" mt-10 flex gap-4 max-lg:justify-center">
              <button
                className="hero-btn bg-gradient-to-r from-green-700 to-green-600 px-8 py-4 max-sm:py-3 rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-800 hover:to-green-700 active:scale-95 transition-transform duration-200 text-white max-md:px-5"
                onClick={() => router.push("/#destinasi")}
              >
                Mulai Menjelajah
              </button>
              <button
                className="hero-btn bg-gradient-to-r from-sky-700 to-sky-600 text-white px-8 py-4 max-sm:py-3 rounded-full shadow-md hover:bg-gradient-to-r hover:from-sky-800 hover:to-sky-700 active:scale-95 transition-transform duration-200 max-md:px-5"
                onClick={() => router.push("/chat")}
              >
                Tanya MajaGo
              </button>
            </div>
          </div>

          <div className="relative">
            {/* dotted outline shape behind */}
            <svg
              aria-hidden
              viewBox="0 0 600 600"
              className="hero-decoration pointer-events-none absolute -left-6 -top-8 hidden h-[560px] w-[560px] text-blue-200 lg:block "
            >
              <rect
                x="40"
                y="40"
                width="520"
                height="520"
                rx="48"
                fill="none"
                stroke="currentColor"
                strokeDasharray="4 10"
                strokeWidth="2"
              />
            </svg>

            <div className="mx-auto grid h-[520px] w-[520px] grid-cols-6 grid-rows-6 gap-4 max-lg:scale-90 max-md:h-[420px] max-lg:w-full max-md:grid-cols-4 max-md:grid-rows-6 z-[1] relative">
              {/* 1 */}
              <Figure
                img={IMAGES[0]}
                className="hero-image-item col-start-1 col-span-3 row-start-1 row-span-3 rounded-l-4xl rounded-tr-4xl"
              />
              {/* 2 */}
              <Figure
                img={IMAGES[1]}
                className="hero-image-item col-start-4 col-span-3 row-start-1 row-span-4 rounded-r-4xl rounded-tl-4xl"
              />
              {/* 3 */}
              <Figure
                img={IMAGES[2]}
                className="hero-image-item col-start-1 col-span-3 row-start-4 row-span-3 rounded-l-4xl rounded-br-4xl"
              />
              {/* 4 */}
              <Figure
                img={IMAGES[3]}
                className="hero-image-item col-start-4 col-span-2 row-start-5 row-span-2 rounded-4xl max-md:hidden"
              />
              {/* 5 */}
              <Figure
                img={IMAGES[4]}
                className="hero-image-item col-start-6 col-span-1 row-start-5 row-span-2 rounded-r-4xl rounded-bl-4xl"
              />
            </div>

            {/* small yellow "wifi" swoosh */}
            <svg
              aria-hidden
              viewBox="0 0 64 64"
              className="hero-decoration absolute -right-3 top-6 hidden h-10 w-10 text-yellow-400 lg:block"
            >
              <path
                d="M12 44c16-16 24-16 40 0"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M20 52c8-8 16-8 24 0"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Figure({ img, className = "" }: { img: ImageItem; className?: string }) {
  return (
    <div className={"overflow-hidden  ring-1 ring-black/5 shadow-md " + className}>
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}
