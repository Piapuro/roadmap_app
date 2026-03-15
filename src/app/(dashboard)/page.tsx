// Server Component
import type { Metadata } from "next";
import { Settings } from "lucide-react";
import { DashboardSidebar } from "@/client/components/members/DashboardSidebar";
import { StatCard } from "@/client/components/dashboard/StatCard";
import { DeadlineCard } from "@/client/components/dashboard/DeadlineCard";
import { MemberWorkloadCard } from "@/client/components/dashboard/MemberWorkloadCard";
import { TodoListCard } from "@/client/components/dashboard/TodoListCard";
import { AnnouncementCard } from "@/client/components/dashboard/AnnouncementCard";
import {
  MOCK_STATS,
  MOCK_DEADLINES,
  MOCK_MEMBER_WORKLOAD,
  MOCK_TODOS,
  MOCK_ANNOUNCEMENTS,
} from "@/types/dashboard";

export const metadata: Metadata = {
  title: "ダッシュボード | ROADMAP AI",
  description: "チームの進捗を確認・管理します",
};

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#F2F3F0]">
      <DashboardSidebar activeLabel="ダッシュボード" />

      <main className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-3 px-8 border-b border-[#CBCCC9] bg-[#F2F3F0] h-[72px] shrink-0">
          <div className="flex flex-col gap-0.5 flex-1">
            <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xl font-bold">
              ダッシュボード
            </h1>
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[13px]">
              チームの進捗を一目で確認できます
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#CBCCC9] bg-white px-4 py-2 text-[13px] font-semibold text-[#111111] hover:bg-[#F2F3F0] transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px]">
              チーム設定
            </span>
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-col flex-1 gap-5 p-8 overflow-y-auto">
          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4">
            {MOCK_STATS.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Content row */}
          <div className="flex flex-1 gap-4 min-h-0">
            {/* Left col */}
            <div className="flex flex-col flex-1 gap-4 min-h-0">
              <DeadlineCard deadlines={MOCK_DEADLINES} />
              <TodoListCard todos={MOCK_TODOS} />
            </div>

            {/* Right col */}
            <div className="flex flex-col w-[320px] gap-4 shrink-0">
              <MemberWorkloadCard members={MOCK_MEMBER_WORKLOAD} />
              <AnnouncementCard announcements={MOCK_ANNOUNCEMENTS} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
