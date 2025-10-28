// app/detail/[slug]/page.tsx

// Kita akan memuat data di Server Component, ini bagus untuk SEO
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, MapPin, DollarSign, Sparkles } from "lucide-react";

// 1. Impor data JSON lengkap Anda
// (Sesuaikan path jika Anda menyimpannya di tempat lain)
import fullData from "@/app/data/majalengka-data.json";
import { slugify } from "@/app/lib/utils";

// Tipe data (bisa Anda pindah ke file types.ts)
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

// 2. Fungsi untuk menemukan data berdasarkan slug
function findItemBySlug(slug: string): ItemData | null {
  const { pariwisata, budaya, kuliner } = fullData;

  // Gabungkan semua item dari semua kategori menjadi satu array
  const allItems: ItemData[] = [
    ...pariwisata.alam,
    ...pariwisata.buatan,
    ...pariwisata.sejarah_dan_budaya,
    ...budaya,
    ...kuliner.makanan,
    ...kuliner.minuman,
    ...kuliner.oleh_oleh,
  ];

  // Cari item yang slug-nya cocok
  const item = allItems.find((item) => slugify(item.nama) === slug);

  return item || null;
}

// 3. Komponen Halaman (Server Component)
export default function DetailPage({ params }: { params: { slug: string } }) {
  const item = findItemBySlug(params.slug);
  console.log(item)

  // 4. Jika data tidak ditemukan, tampilkan halaman 404
  if (!item) {
    notFound();
  }

  // (Dummy) Asumsi Anda menambahkan 'imageUrl' dan 'gallery' ke data JSON Anda
  const heroImage = item.imageUrl || "/images/hero-background.jpg"; // Gambar default
  const galleryImages = [
    item.imageUrl || "/images/destinasi-1.jpg",
    "/images/destinasi-2.jpg",
    "/images/destinasi-3.jpg",
  ];

  // 5. Render Bento Grid
  return (
    // 'pt-16' memberi padding untuk navbar
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
      {/* Judul Utama */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">{item.nama}</h1>

      {/* Kontainer Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
        {/* Box 1: Hero Image (Besar) */}
        <div className="md:col-span-4 rounded-3xl overflow-hidden shadow-lg relative">
          <Image src={heroImage} alt={item.nama} fill sizes="100vw" className="object-cover" />
        </div>

        {/* Box 2: Deskripsi (Tinggi) */}
        <div className="md:col-span-2 md:row-span-2 bg-white p-6 rounded-3xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Deskripsi</h2>
          <p className="text-gray-700 text-lg leading-relaxed flex-grow">{item.deskripsi}</p>
          {item.catatan && (
            <p className="mt-4 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
              <strong>Catatan:</strong> {item.catatan}
            </p>
          )}
        </div>

        {/* Box 3: Info Cepat (Sedang) */}
        <div className="md:col-span-2 bg-green-50 p-6 rounded-3xl shadow-lg flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4 text-green-900">Info Cepat</h2>
          <ul className="space-y-3">
            {item.lokasi && <InfoItem icon={MapPin} label="Lokasi" value={item.lokasi} />}
            {item.harga && <InfoItem icon={DollarSign} label="Harga Tiket" value={item.harga} />}
            {item.jam_operasional && (
              <InfoItem icon={Clock} label="Jam Buka" value={item.jam_operasional} />
            )}
            {item.asal && <InfoItem icon={Sparkles} label="Asal" value={item.asal} />}
          </ul>
        </div>

        {/* Box 4: Peta (Sedang) - Gunakan Google Maps Embed */}
        <div className="md:col-span-2 bg-gray-100 p-6 rounded-3xl shadow-lg flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Peta Lokasi</h2>
          <div className="w-full h-full rounded-2xl overflow-hidden flex-grow">
            {/* Ganti 'src' dengan iframe embed Google Maps yang sebenarnya */}
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${item.nama},Majalengka`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Box 5: Galeri Mini (Tinggi) */}
        <div className="md:col-span-2 md:row-span-2 bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Galeri</h2>
          <div className="grid grid-cols-2 gap-4 h-full">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden h-full min-h-[150px]">
                <Image
                  src={img}
                  alt={`Galeri ${item.nama} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen helper kecil untuk 'Info Cepat'
const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => (
  <li className="flex items-start">
    <Icon className="w-5 h-5 text-green-700 mr-3 flex-shrink-0 mt-1" />
    <span className="text-gray-800">
      <strong className="font-semibold block text-gray-900">{label}:</strong>
      {value}
    </span>
  </li>
);
