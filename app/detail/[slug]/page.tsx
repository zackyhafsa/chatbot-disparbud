// app/detail/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Clock, MapPin, DollarSign, Sparkles } from "lucide-react";
import SmartImage from "@/app/components/SmartImage";

import fullData from "@/app/data/majalengka-data.json";
import { slugify } from "@/app/lib/utils";

type ItemData = {
  nama: string;
  deskripsi: string;
  lokasi?: string;
  harga?: string;
  jam_operasional?: string;
  imageUrl?: string;
  catatan?: string;
  asal?: string;
};

function findItemBySlug(slug: string): ItemData | null {
  const { pariwisata, budaya, kuliner } = fullData;
  const allItems: ItemData[] = [
    ...pariwisata.alam,
    ...pariwisata.buatan,
    ...pariwisata.sejarah_dan_budaya,
    ...budaya,
    ...kuliner.makanan,
    ...kuliner.minuman,
    ...kuliner.oleh_oleh,
  ];
  return allItems.find((it) => slugify(it.nama) === slug) || null;
}

export default function DetailPage({ params }: { params: { slug: string } }) {
  const item = findItemBySlug(params.slug);
  if (!item) notFound();

  // --- KEMBALI KE SEMULA (tanpa fetch): pakai imageUrl atau fallback lokal
  const heroImage = item.imageUrl || "/images/hero-background.jpg";
  const galleryImages = [
    item.imageUrl || "/images/destinasi-1.jpg",
    "/images/destinasi-2.jpg",
    "/images/destinasi-3.jpg",
  ];
  // ---

  return (
    <div className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-balance text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
          {item.nama}
        </h1>
        {item.asal && <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.asal}</p>}

        {/* HERO */}
        <section className="relative mt-8 overflow-hidden rounded-[32px] ring-1 ring-black/5 shadow-xl">
          <div className="relative aspect-[16/7] w-full">
            <SmartImage
              src={heroImage}
              alt={item.nama}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              // Opsional: kalau mau fallback gambar file tertentu dulu sebelum placeholder UI
              // fallbackSrc="/images/placeholder-16x9.jpg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto">
              <div className="flex max-w-3xl flex-wrap gap-2 rounded-2xl bg-white/70 px-3 py-3 backdrop-blur-md ring-1 ring-green-700/10 ">
                {item.lokasi && <Pill icon={MapPin} label={item.lokasi} />}
                {item.jam_operasional && <Pill icon={Clock} label={item.jam_operasional} />}
                {item.harga && <Pill icon={DollarSign} label={item.harga} />}
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-8 space-y-6">
            <article className="rounded-3xl bg-white p-6 md:p-8 shadow-xl ring-1 ring-green-700/5 ">
              <h2 className="text-2xl font-semibold text-gray-900 ">Deskripsi</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-700 ">{item.deskripsi}</p>
              {item.catatan && (
                <p className="mt-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                  <strong>Catatan:</strong> {item.catatan}
                </p>
              )}
            </article>

            <section className="rounded-3xl bg-white p-6 md:p-8 shadow-xl ring-1 ring-black/5 ">
              <h2 className="text-2xl font-semibold text-gray-900">Galeri</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                {galleryImages.map((src, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md transition-transform duration-300 hover:scale-[1.02] ${
                      i === 0 ? "md:col-span-2 md:row-span-2 aspect-[16/10]" : "aspect-[4/3]"
                    }`}
                  >
                    <SmartImage
                      src={src}
                      alt={`Galeri ${item.nama} ${i + 1}`}
                      fill
                      sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 33vw"
                      className="object-cover"
                      // fallbackSrc="/images/placeholder-4x3.jpg"
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="md:col-span-4 space-y-6 md:sticky md:top-24 self-start">
            <div className="rounded-3xl bg-green-100 p-6 shadow-xl ring-1 ring-black/5 ">
              <h2 className="text-2xl font-semibold text-green-900">Info Cepat</h2>
              <ul className="mt-4 space-y-3">
                {item.lokasi && <InfoItem icon={MapPin} label="Lokasi" value={item.lokasi} />}
                {item.harga && (
                  <InfoItem icon={DollarSign} label="Harga Tiket" value={item.harga} />
                )}
                {item.jam_operasional && (
                  <InfoItem icon={Clock} label="Jam Buka" value={item.jam_operasional} />
                )}
                {item.asal && <InfoItem icon={Sparkles} label="Asal" value={item.asal} />}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-0 shadow-xl ring-1 ring-black/5 ">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 ">Peta Lokasi</h2>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-b-3xl">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
                    `${item.nama}, Majalengka`
                  )}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen={false}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI Helpers ---------- */
function Pill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl bg-green-100 px-3 py-2 text-sm font-medium text-green-700 ring-1 ring-green-700/10 backdrop-blur ">
      <Icon className="h-4 w-4 opacity-70" />
      {label}
    </span>
  );
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <li className="flex items-start rounded-xl bg-white p-3 ring-1 ring-black/5 backdrop-blur">
    <Icon className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-green-700 " />
    <div className="text-sm/6 text-gray-800 ">
      <span className="block text-base font-semibold text-gray-900 ">{label}</span>
      <span>{value}</span>
    </div>
  </li>
);
