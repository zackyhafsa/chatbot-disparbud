// components/Footer.tsx

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

// Ganti nama aplikasi Anda di sini jika perlu
const APP_NAME = "MajaGo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Kontainer Grid Utama */}
        {/* Grid 1 kolom di mobile, 5 kolom di desktop.
          - 2 kolom untuk Brand
          - 1 kolom untuk Jelajahi
          - 1 kolom untuk Tautan
          - 1 kolom untuk Sosial Media
        */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* 1. Brand & Deskripsi (2 kolom) */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-3xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              {APP_NAME}
            </Link>
            <p className="mt-4 max-w-xs">
              Sistem Informasi Pariwisata Majalengka dilengkapi Asisten Virtual AI.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Sebuah Project KP untuk Dinas Pariwisata dan Kebudayaan Majalengka.
            </p>
          </div>

          {/* 2. Link Navigasi 'Jelajahi' */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Jelajahi</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/#destinasi" className="hover:text-blue-400 transition-colors">
                  Destinasi
                </Link>
              </li>
              <li>
                <Link href="/#budaya" className="hover:text-blue-400 transition-colors">
                  Budaya
                </Link>
              </li>
              <li>
                <Link href="/#kuliner" className="hover:text-blue-400 transition-colors">
                  Kuliner
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-blue-400 transition-colors">
                  Tanya Asisten
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Link Tautan Terkait */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Tautan Terkait
            </h3>
            <ul className="mt-4 space-y-3">
              {/* Ganti link '#' dengan link sebenarnya nanti */}
              <li>
                <Link href="#" target="_blank" className="hover:text-blue-400 transition-colors">
                  Disparbud Majalengka
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank" className="hover:text-blue-400 transition-colors">
                  Pemkab Majalengka
                </Link>
              </li>
              <li>
                <Link href="#" target="_blank" className="hover:text-blue-400 transition-colors">
                  Wonderful Indonesia
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Media Sosial */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Ikuti Kami
            </h3>
            <div className="flex mt-4 space-x-5">
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-400 transition-colors"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-blue-400 transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </Link>
              <Link href="#" aria-label="YouTube" className="hover:text-blue-400 transition-colors">
                <Youtube size={24} />
              </Link>
            </div>
          </div>
        </div>
        {/* Akhir Grid Utama */}

        {/* Garis Pemisah & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center sm:text-left sm:flex sm:justify-between">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-sm mt-4 sm:mt-0">
            Dibuat dengan ❤️ oleh <span className="font-semibold text-white">Anda</span> untuk
            Majalengka.
          </p>
        </div>
      </div>
    </footer>
  );
}
