// Server Component
import type { Metadata } from 'next'
import Link from 'next/link'
import { getTeamSettings } from '@/server/actions/team'
import { TeamSettingsForm } from '@/client/components/team/TeamSettingsForm'
import { DashboardSidebar } from '@/client/components/common/DashboardSidebar'
import type { TeamSettings } from '@/types/team'

export const metadata: Metadata = {
  title: 'チーム設定 | ROADMAP AI',
  description: 'チーム名・期間・目標・レベルを変更できます',
}

// TODO: replace with Supabase session teamId (#006)
const MOCK_TEAM_ID = 'mock-team-id'

const MOCK_SETTINGS: TeamSettings = {
  id:        MOCK_TEAM_ID,
  name:      'Roadmap AI Dev Team',
  startDate: '2025-01-10',
  endDate:   '2025-12-31',
  goal:      'MVP完成・チームスキルアップ・プロダクトリリース',
  level:     'INTERMEDIATE',
}

export default async function TeamSettingsPage() {
  let settings: TeamSettings
  try {
    settings = await getTeamSettings(MOCK_TEAM_ID)
  } catch {
    settings = MOCK_SETTINGS
  }

  return (
    <div className="flex h-screen bg-[#F2F3F0]">
      <DashboardSidebar />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Breadcrumb header */}
        <header className="flex items-center gap-2 px-8 h-[72px] bg-[#F2F3F0] border-b border-[#CBCCC9] shrink-0">
          <Link
            href="/team"
            className="flex items-center gap-1.5 text-sm text-[#666666] hover:text-[#111111] transition-colors font-[family-name:var(--font-geist-sans)]"
          >
            ← チーム管理
          </Link>
          <span className="text-sm text-[#999999]">/</span>
          <span className="text-sm font-semibold text-[#111111] font-[family-name:var(--font-geist-sans)]">
            チーム設定
          </span>
        </header>

        {/* Page body */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-10 py-8">
            <div className="flex flex-col gap-1">
              <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[22px] font-bold">
                チーム設定
              </h1>
              <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
                チーム名・期間・目標・レベルを変更できます。
              </p>
            </div>

            <TeamSettingsForm initialSettings={settings} />
          </div>
        </div>

      </div>
    </div>
  )
}
