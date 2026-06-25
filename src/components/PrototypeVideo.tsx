export default function PrototypeVideo({ src }: { src: string }) {
  return (
    <section className="mb-16">
      <span className="mb-3 inline-block rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/60">
        See it in action
      </span>
      <h2 className="mb-6">The final flow, walked through</h2>
      <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
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
