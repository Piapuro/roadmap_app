import type { MilestoneItem, MilestoneStatus } from "@/types/dashboard";

const STATUS_STYLES: Record<MilestoneStatus, { text: string; label: string }> = {
  done:        { text: "text-[#22c55e]", label: "達成" },
  in_progress: { text: "text-[#FF8400]", label: "進行中" },
  pending:     { text: "text-[#71717a]", label: "未着手" },
};

interface MilestoneCardProps {
  milestones: MilestoneItem[];
}

export function MilestoneCard({ milestones }: MilestoneCardProps) {
  return (
    <div className="flex-1 rounded-xl bg-white border border-[#CBCCC9] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#CBCCC9] shrink-0">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-semibold">
          マイルストーン
        </span>
        <span className="font-[family-name:var(--font-geist-sans)] text-[#FF8400] text-[13px] cursor-pointer">
          すべて見る →
        </span>
      </div>

      {/* Rows */}
      <div className="flex flex-col flex-1">
        {milestones.map((ms) => {
          const s = STATUS_STYLES[ms.status];
          return (
            <div
              key={ms.id}
              className="flex items-center justify-between px-5 py-3.5 border-b border-[#CBCCC9] last:border-b-0"
            >
              <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[13px] font-medium">
                {ms.name}
              </span>
              <span className={`font-[family-name:var(--font-geist-sans)] text-xs ${s.text}`}>
                {ms.date} · {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
