// Server Component
import type { Metadata } from "next";
import { UserPlus } from "lucide-react";
import { Suspense } from "react";
import { DashboardSidebar } from "@/client/components/members/DashboardSidebar";
import { MemberTable } from "@/client/components/members/MemberTable";
import { MemberSearch } from "@/client/components/members/MemberSearch";
import { InvitePanel } from "@/client/components/members/InvitePanel";
import { MOCK_MEMBERS, MOCK_CURRENT_USER_ID } from "@/client/mocks/member";

export const metadata: Metadata = {
  title: "チーム管理 | ROADMAP AI",
  description: "メンバーの管理・ロール設定・招待",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function MembersPage({ searchParams }: PageProps) {
  const { q } = await searchParams;

  const filtered = q
    ? MOCK_MEMBERS.filter(
        (m) =>
          m.name.includes(q) ||
          m.email.includes(q) ||
          m.skills.some((s) => s.toLowerCase().includes(q.toLowerCase()))
      )
    : MOCK_MEMBERS;

  return (
    <div className="flex h-screen bg-[#F2F3F0]">
      <DashboardSidebar />

      <main className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-8 border-b border-[#CBCCC9] bg-[#F2F3F0] h-[72px] shrink-0">
          <div className="flex flex-col gap-0.5 flex-1">
            <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xl font-bold">
              チーム管理
            </h1>
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[13px]">
              メンバーの管理・ロール設定・招待
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#FF8400] px-5 py-2.5 text-sm font-semibold text-[#111111] hover:bg-[#e67700] transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] font-semibold">
              メンバーを招待
            </span>
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {/* Member list */}
          <div className="flex-1 flex flex-col gap-4 p-8 overflow-y-auto">
            {/* Section header */}
            <div className="flex items-center gap-2">
              <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-base font-bold">
                メンバー一覧
              </h2>
              <div className="flex items-center justify-center rounded-full bg-[#FF8400] px-2.5 py-0.5 min-w-[24px]">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xs font-semibold">
                  {MOCK_MEMBERS.length}
                </span>
              </div>
              <div className="flex-1" />
              <Suspense>
                <MemberSearch />
              </Suspense>
            </div>

            {/* Table */}
            <MemberTable members={filtered} currentUserId={MOCK_CURRENT_USER_ID} />
          </div>

          {/* Right panel */}
          <InvitePanel />
        </div>
      </main>
    </div>
  );
}
