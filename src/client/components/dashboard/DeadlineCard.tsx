import type { DeadlineItem, TaskPriority } from "@/types/dashboard";

const PRIORITY_STYLES: Record<TaskPriority, { bg: string; text: string }> = {
  P0: { bg: "bg-[#fef2f2]", text: "text-[#ef4444]" },
  P1: { bg: "bg-[#fff7ed]", text: "text-[#f97316]" },
  P2: { bg: "bg-[#f4f4f5]", text: "text-[#71717a]" },
};

interface DeadlineCardProps {
  deadlines: DeadlineItem[];
}

export function DeadlineCard({ deadlines }: DeadlineCardProps) {
  return (
    <div className="rounded-xl bg-white border border-[#CBCCC9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#CBCCC9]">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-semibold">
          直近の期限
        </span>
        <span className="font-[family-name:var(--font-geist-sans)] text-[#FF8400] text-[13px] cursor-pointer">
          すべて見る →
        </span>
      </div>

      {/* Rows */}
      {deadlines.map((item) => {
        const p = PRIORITY_STYLES[item.priority];
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 px-5 py-3.5 border-b border-[#CBCCC9] last:border-b-0"
          >
            {/* Badge */}
            <div
              className="flex items-center justify-center rounded-md h-6 w-[52px] shrink-0"
              style={{ backgroundColor: item.badgeBg }}
            >
              <span className="font-[family-name:var(--font-geist-sans)] text-[11px] font-medium text-[#111111]">
                {item.dueBadge}
              </span>
            </div>

            {/* Title */}
            <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[13px] flex-1 truncate">
              {item.title}
            </span>

            {/* Priority */}
            <span
              className={`font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold px-2 py-0.5 rounded-full ${p.bg} ${p.text}`}
            >
              {item.priority}
            </span>
          </div>
        );
      })}
    </div>
  );
}
