import Image from "next/image";

export default function DarkImageSection({
  src,
  alt,
  priority,
  aspect = "16 / 9",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspect?: string;
}) {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 p-3 sm:p-5">
      <div
        className="relative w-full overflow-hidden rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
