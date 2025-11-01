"use client";

import Image, { ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

type Props = Omit<ImageProps, "src" | "alt"> & {
  src?: string | null;
  alt: string;
  fallbackSrc?: string; // opsional: kalau ada, dicoba dulu sebelum placeholder UI
  placeholderLabel?: string; // teks kecil di placeholder
};

export default function SmartImage({
  src,
  alt,
  fallbackSrc,
  className,
  placeholderLabel = "Tidak ada gambar",
  ...rest
}: Props) {
  const [curSrc, setCurSrc] = useState<string | undefined>(src || undefined);
  const [showPH, setShowPH] = useState<boolean>(!src); // kalau src kosong, langsung placeholder

  if (showPH) {
    // Placeholder UI (tanpa file apa pun)
    return (
      <div
        className={
          "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(234,179,8,0.12),transparent_45%)] " +
          (className || "")
        }
      >
        <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2 text-xs text-neutral-600 ring-1 ring-black/10 backdrop-blur">
          <ImageOff className="h-4 w-4" />
          {placeholderLabel}
        </div>
      </div>
    );
  }

  return (
    <Image
      {...rest}
      alt={alt}
      className={className}
      src={curSrc as string}
      onError={() => {
        if (fallbackSrc && curSrc !== fallbackSrc) {
          setCurSrc(fallbackSrc);
        } else {
          setShowPH(true);
        }
      }}
    />
  );
}
