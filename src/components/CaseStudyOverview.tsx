export default function CaseStudyOverview({
  role,
  platform,
  team,
  duration,
}: {
  role: string;
  platform: string;
  team: string;
  duration?: string;
}) {
  return (
    <div className="mb-12 grid gap-4 border-y border-white/10 py-6 text-sm sm:grid-cols-4">
      <div>
        <span className="block text-white/40">Role</span>
        <span className="text-white/80">{role}</span>
      </div>
      <div>
        <span className="block text-white/40">Platform</span>
        <span className="text-white/80">{platform}</span>
      </div>
      <div>
        <span className="block text-white/40">Team</span>
        <span className="text-white/80">{team}</span>
      </div>
      {duration && (
        <div>
          <span className="block text-white/40">Duration</span>
          <span className="text-white/80">{duration}</span>
        </div>
      )}
    </div>
  );
}
