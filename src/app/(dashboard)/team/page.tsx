// Server Component
import type { Metadata } from 'next'
import { getMembers } from '@/server/actions/team'
import { RoleManagement } from '@/client/components/team/RoleManagement'

export const metadata: Metadata = {
  title: 'メンバー管理 | ROADMAP AI',
  description: 'チームメンバーのロールを管理します',
}

// TODO: replace with Supabase session teamId (#006)
const MOCK_TEAM_ID = 'mock-team-id'

export default async function TeamPage() {
  const members = await getMembers(MOCK_TEAM_ID)

  return (
    <div className="flex flex-col gap-6 px-10 py-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[22px] font-bold">
          メンバー管理
        </h1>
        <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
          チームメンバーのロールを変更できます。降格時はタスクが自動的に未アサインになります。
        </p>
      </div>

      <RoleManagement initialMembers={members} />
    </div>
  )
}
