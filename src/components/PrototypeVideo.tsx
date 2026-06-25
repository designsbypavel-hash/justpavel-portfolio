export default function PrototypeVideo({ src }: { src: string }) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 uppercase">Prototype</h2>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          className="w-full"
        />
      </div>
    </section>
  );
}
