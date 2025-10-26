"use client";

import { motion, Variants } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ImageItem = { src: string; alt: string };

const IMAGES: ImageItem[] = [
  {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgb9L18SuxPDLlVVL9XqvR-ux9MNVaBEv6n_0_rC_H0k02UxDGfGmzrGKZZ7lmtVeUKIhFY7zQ3ZhJIlVzWtnETvEKusqNtmzZ7TGGNiy3f6N5bSTBxmfW0d7IElxI0Y41cm1CKjjHkNk0/s1600/ragampost-majalengka-panyaweuyan-003.jpg",
    alt: "Panyaweyan Majalengka",
  },
  {
    src: "https://asset.kompas.com/crops/a1yJgkxOKj3-7lv8qVQl8p08X7Y=/0x0:780x520/1200x800/data/photo/2021/12/30/61cd16a5dca28.jpeg",
    alt: "Kuliner Majalengka",
  },
  {
    src: "https://asset.kompas.com/crops/_tzIJ6Zpdh5VeeemIMT_MB8jqME=/0x7:689x467/750x500/data/photo/2022/06/02/62986065aa565.jpeg",
    alt: "Cipanten",
  },
  {
    src: "https://img-global.cpcdn.com/recipes/c782fb6bf3710239/1200x630cq80/photo.jpg",
    alt: "Jalakotek",
  },
  {
    src: "https://cdn.rri.co.id/berita/24/images/1686227995639-IMG-20230608-WA0007/1686227995639-IMG-20230608-WA0007.jpg",
    alt: "Kebudayaan Majalengka",
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroTravel() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[rgb(248,251,255)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-100/60 blur-2xl " />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-blue-100/60 blur-2xl " />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-72 lg:h-screen flex items-center max-lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-balance text-4xl font-bold leading-tight text-gray-800 tracking-tight sm:text-5xl md:text-6xl max-lg:text-center "
            >
              Jelajahi{" "}
              <span className="bg-gradient-to-r from-sky-500 to-green-600 bg-clip-text text-transparent">
                Kuliner, Budaya dan Kesenian
              </span>{" "}
              di Majalengka
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.2, ease: "easeOut", duration: 0.6 }}
              className="mt-4 text-pretty text-neutral-600 sm:text-lg max-lg:text-center"
            >
              Plan and book your perfect trip with expert advice, travel tips, destination info, and
              inspiration from us.
            </motion.p>
            <svg
              aria-hidden
              viewBox="0 0 240 120"
              className="absolute -right-12 top-24 hidden h-24 w-40 text-yellow-400 lg:block"
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
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ease: "easeOut", duration: 0.6 }}
                className="bg-gradient-to-r from-green-700 to-green-600 px-8 py-4 max-sm:py-3 rounded-full shadow-md hover:bg-gradient-to-r hover:from-green-800 hover:to-green-700 text-white "
                onClick={() => router.push("/explore")}
              >
                Mulai Menjelajah
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ease: "easeOut", duration: 0.6 }}
                className="bg-gradient-to-r from-sky-700 to-sky-600 text-white px-8 py-4 max-sm:py-3 rounded-full shadow-md hover:bg-gradient-to-r hover:from-sky-800 hover:to-sky-700"
                onClick={() => router.push("/chat")}
              >
                Tanya MajaGo
              </motion.button>
            </div>
          </div>

          <div className="relative">
            {/* dotted outline shape behind */}
            <svg
              aria-hidden
              viewBox="0 0 600 600"
              className="pointer-events-none absolute -left-6 -top-8 hidden h-[560px] w-[560px] text-blue-200 lg:block "
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.8, ease: "easeOut", duration: 0.6 }}
              className="mx-auto grid h-[520px] w-[520px] grid-cols-6 grid-rows-6 gap-4 max-lg:scale-90 max-md:h-[420px] max-lg:w-full max-md:grid-cols-4 max-md:grid-rows-6 z-[1] relative"
            >
              {/* 1 */}
              <Figure
                img={IMAGES[0]}
                className="col-start-1 col-span-3 row-start-1 row-span-3 rounded-l-4xl rounded-tr-4xl"
              />
              {/* 2 */}
              <Figure
                img={IMAGES[1]}
                className="col-start-4 col-span-3 row-start-1 row-span-4 rounded-r-4xl rounded-tl-4xl"
              />
              {/* 3 */}
              <Figure
                img={IMAGES[2]}
                className="col-start-1 col-span-3 row-start-4 row-span-3 rounded-l-4xl rounded-br-4xl"
              />
              {/* 4 */}
              <Figure
                img={IMAGES[3]}
                className="col-start-4 col-span-2 row-start-5 row-span-2 rounded-4xl"
              />
              {/* 5 */}
              <Figure
                img={IMAGES[4]}
                className="col-start-6 col-span-1 row-start-5 row-span-2 rounded-r-4xl rounded-bl-4xl"
              />
            </motion.div>

            {/* small yellow "wifi" swoosh */}
            <svg
              aria-hidden
              viewBox="0 0 64 64"
              className="absolute -right-3 top-6 hidden h-10 w-10 text-yellow-400 lg:block"
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
