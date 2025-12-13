// app/detail/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { useRef, use } from "react";
import Link from "next/link";
import {
  Clock,
  MapPin,
  DollarSign,
  Sparkles,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmartImage from "@/app/components/SmartImage";

import fullData from "@/app/data/majalengka-data.json";
import { slugify } from "@/app/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ItemData = {
  nama: string;
  deskripsi: string;
  lokasi?: string;
  harga?: string;
  jam_operasional?: string;
  imageUrl?: string;
  catatan?: string;
  asal?: string;
  image?: string;
};

function findItemBySlug(slug: string): ItemData | null {
  const { pariwisata, budaya, kuliner } = fullData;
  const allItems: ItemData[] = [
    ...pariwisata.alam,
    ...pariwisata.buatan,
    ...pariwisata.sejarah_dan_budaya,
    ...budaya,
    ...kuliner.makanan,
    ...kuliner.manisan,
    ...kuliner.oleh_oleh,
  ];
  return allItems.find((it) => slugify(it.nama) === slug) || null;
}

function getRelatedItems(currentSlug: string, category?: string): ItemData[] {
  const { pariwisata, budaya, kuliner } = fullData;
  const allItems: ItemData[] = [
    ...pariwisata.alam,
    ...pariwisata.buatan,
    ...pariwisata.sejarah_dan_budaya,
    ...budaya,
    ...kuliner.makanan,
    ...kuliner.manisan,
    ...kuliner.oleh_oleh,
  ];
  return allItems.filter((it) => slugify(it.nama) !== currentSlug).slice(0, 3);
}

export default function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const item = findItemBySlug(slug);
  if (!item) notFound();

  const containerRef = useRef<HTMLDivElement>(null);
  const relatedItems = getRelatedItems(slug);

  const heroImage = item.imageUrl || "/images/hero-background.jpg";

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Hero animations
      tl.fromTo(".detail-back", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
        .fromTo(
          ".detail-breadcrumb",
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.3"
        )
        .fromTo(
          ".detail-title",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(".detail-meta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(
          ".detail-hero",
          { y: 40, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".detail-actions",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          "-=0.4"
        );

      // Content animations on scroll
      gsap.fromTo(
        ".detail-content",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-content",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".detail-sidebar",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-sidebar",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".detail-related",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-related",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".related-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".detail-related",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: item.nama,
        text: item.deskripsi,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">
          {/* Back Button & Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <Link
              href="/"
              className="detail-back inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200 group w-fit"
            >
              <ArrowLeft
                size={18}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />
              <span className="text-sm font-medium">Kembali</span>
            </Link>

            <nav className="detail-breadcrumb flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-green-600 transition-colors">
                Beranda
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">{item.nama}</span>
            </nav>
          </div>

          {/* Title & Meta */}
          <div className="space-y-4">
            <h1 className="detail-title text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              {item.nama}
            </h1>

            <div className="detail-meta flex flex-wrap items-center gap-3">
              {item.lokasi && (
                <span className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
                  <MapPin size={16} className="text-green-600" />
                  {item.lokasi}
                </span>
              )}
              {item.asal && (
                <span className="inline-flex items-center gap-1.5 text-gray-600 text-sm">
                  <Sparkles size={16} className="text-green-600" />
                  {item.asal}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        <section className="detail-hero relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl mb-8">
          <div className="relative aspect-video sm:aspect-16/8 lg:aspect-16/7 w-full">
            <SmartImage
              src={item.image || heroImage}
              alt={item.nama}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Floating Action Buttons */}
          <div className="detail-actions absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-green-600 transition-all duration-200 shadow-lg active:scale-95"
              aria-label="Bagikan"
            >
              <Share2 size={20} />
            </button>
            <button
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:text-red-500 transition-all duration-200 shadow-lg active:scale-95"
              aria-label="Simpan ke favorit"
            >
              <Heart size={20} />
            </button>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="detail-content lg:col-span-2 space-y-6">
            {/* Description Card */}
            <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Tentang {item.nama}
              </h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                {item.deskripsi}
              </p>

              {item.catatan && (
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-amber-800 text-sm">
                    <strong className="font-semibold">💡 Catatan:</strong> {item.catatan}
                  </p>
                </div>
              )}
            </article>

            {/* CTA Card */}
            <div className="bg-linear-to-br from-green-600 to-green-700 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl font-semibold mb-2">Ingin tahu lebih banyak?</h3>
              <p className="text-green-100 mb-6 text-sm sm:text-base">
                Tanyakan informasi detail tentang {item.nama} kepada asisten virtual kami.
              </p>
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 font-medium rounded-full hover:bg-green-50 transition-colors duration-200 active:scale-95"
              >
                <MessageCircle size={18} />
                <span>Tanya AI Assistant</span>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="detail-sidebar space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi</h2>
              <ul className="space-y-4">
                {item.lokasi && <InfoItem icon={MapPin} label="Lokasi" value={item.lokasi} />}
                {item.harga && <InfoItem icon={DollarSign} label="Harga" value={item.harga} />}
                {item.jam_operasional && (
                  <InfoItem icon={Clock} label="Jam Buka" value={item.jam_operasional} />
                )}
                {item.asal && <InfoItem icon={Sparkles} label="Asal" value={item.asal} />}
              </ul>
            </div>

            {/* Map Card */}
            {item.lokasi && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <div className="p-6 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Lokasi</h2>
                  <p className="text-sm text-gray-500 mt-1">{item.lokasi}, Majalengka</p>
                </div>
                <div className="relative aspect-4/3 bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <MapPin size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Peta lokasi {item.nama}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${item.nama}, Majalengka`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        Buka di Google Maps
                        <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Related Items Section */}
        {relatedItems.length > 0 && (
          <section className="detail-related mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Destinasi Lainnya</h2>
              <Link
                href="/#destinasi"
                className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors inline-flex items-center gap-1"
              >
                Lihat Semua
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((relatedItem, index) => (
                <Link
                  key={index}
                  href={`/detail/${slugify(relatedItem.nama)}`}
                  className="related-card group block"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <SmartImage
                        src={relatedItem.image || "/images/placeholder.jpg"}
                        alt={relatedItem.nama}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
                        {relatedItem.nama}
                      </h3>
                      {relatedItem.lokasi && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin size={12} />
                          {relatedItem.lokasi}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */
const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <li className="flex items-start gap-3">
    <div className="shrink-0 w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
      <Icon size={18} className="text-green-600" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-gray-900 mt-0.5">{value}</p>
    </div>
  </li>
);
