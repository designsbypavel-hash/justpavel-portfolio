import type { TeamGroup } from "@/lib/projects";

export default function TeamComposition({ groups }: { groups: TeamGroup[] }) {
  if (groups.length === 0) return null;
  return (
    <section className="mb-12">
      <h2 className="mb-6 uppercase">Team Composition</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {groups.map((group) => (
          <div
            key={group.function}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
          >
            <span className="mb-2 block text-xs uppercase tracking-widest text-white/40">
              {group.function}
            </span>
            <span className="text-white/80">{group.members}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
