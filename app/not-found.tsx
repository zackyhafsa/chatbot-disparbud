import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-white via-green-50 to-sky-50 p-6 text-center relative overflow-hidden">
      <div className="relative z-10 flex items-center flex-wrap justify-center mx-auto w-full  backdrop-blur-sm p-8 rounded-3xl">
        <div>
          <Image src={"/maja-sorry.png"} alt="not-found" width={400} height={400} />
        </div>
        <div>
          {/* Text Content */}
          <div className="space-y-4 mb-10">
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-linear-to-br from-green-600 to-sky-600 tracking-tighter drop-shadow-sm">
              404
            </h1>

            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">Waduh! Kamu Tersesat?</h2>

            <p className="text-gray-600 text-lg max-w-lg mx-auto leading-relaxed">
              Sepertinya halaman yang kamu cari sedang bersembunyi di balik bukit Panyaweuyan.
              Jangan khawatir, <strong>Si Maja</strong> siap memandu kamu kembali!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-gray-700 border-2 border-gray-100 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-bold shadow-sm hover:shadow-md group"
            >
              <Home className="w-5 h-5 mr-2 group-hover:-translate-y-0.5 transition-transform" />
              Kembali ke Beranda
            </Link>

            <Link
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-linear-to-r from-green-600 to-sky-500 text-white hover:from-green-700 hover:to-sky-600 transition-all duration-300 font-bold shadow-lg hover:shadow-green-500/30 hover:-translate-y-1 group"
            >
              <MessageCircle className="w-5 h-5 mr-2 animate-bounce" />
              Tanya Si Maja
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-6 text-sm text-gray-400 font-medium">
        © {new Date().getFullYear()} MajaGo - Explore Majalengka with AI
      </div>
    </div>
  );
};

export default NotFound;
