import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getRequirement } from '@/server/actions/requirements'
import { RequirementsView } from '@/client/components/requirements/RequirementsView'

export const metadata: Metadata = {
  title: '要件定義 | ROADMAP AI',
}

interface Props {
  params: Promise<{ reqId: string }>
  searchParams: Promise<{ teamId?: string }>
}

export default async function RequirementsViewPage({ params, searchParams }: Props) {
  const { reqId } = await params
  // TODO: Supabase セッションから teamId を取得する（#006 マージ後に置き換え）
  const { teamId = '' } = await searchParams

  try {
    const requirement = await getRequirement(teamId, reqId)
    return (
      <div className="flex h-screen bg-[#F2F3F0]">
        {/* TODO: ダッシュボード Sidebar を追加（#006 マージ後） */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <RequirementsView requirement={requirement} />
        </main>
      </div>
    )
  } catch {
    notFound()
  }
}
