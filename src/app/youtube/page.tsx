const videos = [
  {
    title: "I Switched My AI Tool as a Designer - Here's Why",
    gradient: "from-purple-700 via-indigo-700 to-black",
  },
  {
    title: "How I Use Mobbin Every Day as a Product Designer",
    gradient: "from-indigo-800 via-blue-900 to-black",
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
              <div
                className={`mb-4 aspect-video rounded-xl bg-gradient-to-br ${video.gradient} border border-white/10`}
              />
              <p className="font-medium">{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
