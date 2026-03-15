import type { PhaseProgress } from "@/types/dashboard";

interface PhaseProgressCardProps {
  phases: PhaseProgress[];
}

export function PhaseProgressCard({ phases }: PhaseProgressCardProps) {
  return (
    <div className="rounded-xl bg-white border border-[#CBCCC9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 py-4 border-b border-[#CBCCC9]">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-semibold">
          フェーズ進捗
        </span>
      </div>

      {/* Phases */}
      <div className="flex flex-col gap-3 px-5 py-4">
        {phases.map((phase) => {
          const isDone = phase.percent === 100;
          const barColor = isDone ? "#22c55e" : "#FF8400";
          const pctColor = isDone
            ? "text-[#22c55e]"
            : phase.percent > 0
              ? "text-[#FF8400]"
              : "text-[#71717a]";

          return (
            <div key={phase.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[13px]">
                  {phase.name}
                </span>
                <span
                  className={`font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-semibold ${pctColor}`}
                >
                  {phase.percent}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#F2F3F0] overflow-hidden">
                {phase.percent > 0 && (
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${phase.percent}%`, backgroundColor: barColor }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
