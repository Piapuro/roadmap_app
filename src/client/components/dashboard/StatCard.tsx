import type { StatData } from "@/types/dashboard";

interface StatCardProps {
  stat: StatData;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-white border border-[#CBCCC9] p-5">
      <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[13px]">
        {stat.label}
      </span>
      <span
        className="font-[family-name:var(--font-jetbrains-mono)] text-[32px] font-bold leading-tight"
        style={{ color: stat.valueColor ?? "#111111" }}
      >
        {stat.value}
      </span>
      <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
        {stat.subText}
      </span>
    </div>
  );
}
