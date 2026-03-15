import type { MemberWorkload } from "@/types/dashboard";

interface MemberWorkloadCardProps {
  members: MemberWorkload[];
}

export function MemberWorkloadCard({ members }: MemberWorkloadCardProps) {
  return (
    <div className="rounded-xl bg-white border border-[#CBCCC9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#CBCCC9]">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-semibold">
          メンバー稼働状況
        </span>
      </div>

      {/* Rows */}
      {members.map((m) => {
        const pct = m.total > 0 ? Math.round((m.done / m.total) * 100) : 0;
        return (
          <div
            key={m.id}
            className="flex items-center gap-3 px-4 py-3 border-b border-[#CBCCC9] last:border-b-0"
          >
            {/* Avatar */}
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#111111] shrink-0">
              <span className="font-[family-name:var(--font-geist-sans)] text-white text-[13px] font-medium">
                {m.initial}
              </span>
            </div>

            {/* Info + bar */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[12px] font-medium truncate">
                {m.name}　{m.role} | {m.done}/{m.total} タスク
              </span>
              <div className="h-1.5 rounded-full bg-[#F2F3F0] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#FF8400]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer link */}
      <div className="flex justify-center px-4 py-3 border-t border-[#CBCCC9]">
        <span className="font-[family-name:var(--font-geist-sans)] text-[#FF8400] text-[13px] font-medium cursor-pointer">
          チーム管理で全メンバーを確認 →
        </span>
      </div>
    </div>
  );
}
