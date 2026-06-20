import Image from "next/image";

const videos = [
  {
    title: "I Switched My AI Tool as a Designer - Here's Why",
    image: "/site-assets/youtube-ai-tools.png",
  },
  {
    title: "How I Use Mobbin Every Day as a Product Designer",
    image: "/site-assets/youtube-mobbin.jpg",
  },
];

export default function YoutubePage() {
  return (
    <div className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-16 font-(family-name:--font-heading) text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
          Youtube
        </h1>
        <div className="grid gap-8 sm:grid-cols-2">
          {videos.map((video) => (
            <div key={video.title}>
              <div className="relative mb-4 aspect-video overflow-hidden rounded-xl border border-white/10">
                <Image src={video.image} alt={video.title} fill className="object-cover" />
              </div>
              <p className="font-medium">{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
