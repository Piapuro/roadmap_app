import type { Announcement } from "@/types/dashboard";

interface AnnouncementCardProps {
  announcements: Announcement[];
}

export function AnnouncementCard({ announcements }: AnnouncementCardProps) {
  return (
    <div className="rounded-xl bg-white border border-[#CBCCC9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-5 py-4 border-b border-[#CBCCC9]">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-semibold">
          お知らせ
        </span>
      </div>

      {/* Items */}
      {announcements.map((ann) => (
        <div
          key={ann.id}
          className="flex flex-col gap-1 px-5 py-3.5 border-b border-[#CBCCC9] last:border-b-0"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[13px] font-medium truncate">
              {ann.title}
            </span>
            <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px] shrink-0">
              {ann.date}
            </span>
          </div>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs truncate">
            {ann.content}
          </span>
        </div>
      ))}
    </div>
  );
}
