import { LANE_LABELS, type Lane } from "@/lib/constants";

export function LaneBadge({ lane }: { lane: Lane }) {
  return (
    <span className="inline-flex rounded-full bg-lane px-2.5 py-1 text-xs font-semibold tracking-wide text-muted">
      {LANE_LABELS[lane]}
    </span>
  );
}
