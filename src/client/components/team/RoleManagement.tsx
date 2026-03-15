'use client'

import { useRef, useState, useTransition } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'
import { cn } from '@/client/lib/cn'
import { updateMemberRole } from '@/server/actions/team'
import { isDemotion } from '@/types/team'
import type { TeamMember, Role } from '@/types/team'

const ROLES: Role[] = ['OWNER', 'MEMBER', 'VIEWER']

const ROLE_LABEL: Record<Role, string> = {
  OWNER:  'OWNER',
  MEMBER: 'MEMBER',
  VIEWER: 'VIEWER',
}

// TODO: replace with Supabase session (#006)
const MOCK_CURRENT_USER_ID = 'mock-owner-id'
const MOCK_TEAM_ID = 'mock-team-id'

type PendingChange = {
  member: TeamMember
  nextRole: Role
}

type Props = {
  initialMembers: TeamMember[]
}

export function RoleManagement({ initialMembers }: Props) {
  const [members, setMembers] = useState(initialMembers)
  const [search, setSearch] = useState('')
  const [openSelectId, setOpenSelectId] = useState<string | null>(null)
  const [pending, setPending] = useState<PendingChange | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const filtered = members.filter(
    m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  )

  function handleRoleSelect(member: TeamMember, nextRole: Role) {
    if (nextRole === member.role) {
      setOpenSelectId(null)
      return
    }
    setOpenSelectId(null)
    if (isDemotion(member.role, nextRole)) {
      setPending({ member, nextRole })
    } else {
      applyRoleChange(member, nextRole)
    }
  }

  function applyRoleChange(member: TeamMember, nextRole: Role) {
    setError(null)
    startTransition(async () => {
      try {
        const updated = await updateMemberRole({
          teamId: MOCK_TEAM_ID,
          memberId: member.id,
          role: nextRole,
        })
        setMembers(prev => prev.map(m => (m.id === updated.id ? updated : m)))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'ロールの更新に失敗しました')
      }
    })
  }

  function handleConfirm() {
    if (!pending) return
    applyRoleChange(pending.member, pending.nextRole)
    setPending(null)
  }

  function handleCancel() {
    setPending(null)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Error banner */}
      {error && (
        <div role="alert" className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600 font-[family-name:var(--font-geist-sans)]">{error}</p>
          <button type="button" onClick={() => setError(null)} aria-label="エラーを閉じる">
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )}

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#CBCCC9] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Search bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#CBCCC9]">
          <div className="flex items-center gap-2 flex-1 h-9 rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-3">
            <Search className="w-4 h-4 text-[#999999] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="名前・メールで検索..."
              className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#999999] outline-none"
            />
          </div>
          <span className="text-sm text-[#666666] font-[family-name:var(--font-geist-sans)] shrink-0">
            {members.length} メンバー
          </span>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[240px_1fr_160px_160px] border-b border-[#CBCCC9]">
          {(['メンバー', 'メールアドレス', 'ロール', '参加日'] as const).map(col => (
            <div key={col} className="px-4 py-3 text-xs font-semibold text-[#666666] font-[family-name:var(--font-geist-sans)]">
              {col}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#999999] font-[family-name:var(--font-geist-sans)]">
            該当するメンバーが見つかりません
          </div>
        ) : (
          filtered.map(member => {
            const isSelf = member.id === MOCK_CURRENT_USER_ID
            const isOpen = openSelectId === member.id
            const joinedDate = member.joinedAt
              ? new Date(member.joinedAt).toLocaleDateString('ja-JP')
              : '—'

            return (
              <div
                key={member.id}
                className="grid grid-cols-[240px_1fr_160px_160px] border-b border-[#CBCCC9] last:border-b-0 hover:bg-[#fafafa] transition-colors"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-[#F2F3F0] flex items-center justify-center shrink-0">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-bold">
                      {member.name.slice(0, 1)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)] truncate">
                    {member.name}
                    {isSelf && (
                      <span className="ml-1.5 text-xs text-[#999999] font-normal">（自分）</span>
                    )}
                  </span>
                </div>

                {/* Email */}
                <div className="flex items-center px-4 py-3">
                  <span className="text-sm text-[#666666] font-[family-name:var(--font-geist-sans)] truncate">
                    {member.email}
                  </span>
                </div>

                {/* Role */}
                <div className="flex items-center px-4 py-3">
                  {isSelf ? (
                    <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold bg-[#fff7ed] text-[#c2410c] font-[family-name:var(--font-geist-sans)]">
                      OWNER
                    </span>
                  ) : (
                    <div className="relative" ref={isOpen ? dropdownRef : undefined}>
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => setOpenSelectId(isOpen ? null : member.id)}
                        className={cn(
                          'flex items-center justify-between gap-2 h-8 w-[132px] rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-3 text-sm text-[#111111] font-[family-name:var(--font-geist-sans)] hover:border-[#FF8400] transition-colors disabled:opacity-50',
                          isOpen && 'border-[#FF8400] ring-2 ring-[#FF8400]/20'
                        )}
                      >
                        <span>{ROLE_LABEL[member.role]}</span>
                        <ChevronDown className={cn('w-3.5 h-3.5 text-[#666666] transition-transform', isOpen && 'rotate-180')} />
                      </button>

                      {isOpen && (
                        <ul className="absolute top-full left-0 mt-1 w-[132px] bg-white border border-[#CBCCC9] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] z-20 overflow-hidden">
                          {ROLES.map((role, i) => (
                            <li key={role}>
                              <button
                                type="button"
                                onMouseDown={e => e.preventDefault()}
                                onClick={() => handleRoleSelect(member, role)}
                                className={cn(
                                  'w-full text-left px-4 py-2.5 text-sm font-[family-name:var(--font-geist-sans)] transition-colors hover:bg-[#F2F3F0]',
                                  i > 0 && 'border-t border-[#F2F3F0]',
                                  role === member.role ? 'text-[#FF8400] font-semibold' : 'text-[#111111]'
                                )}
                              >
                                {ROLE_LABEL[role]}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Joined date */}
                <div className="flex items-center px-4 py-3">
                  <span className="text-sm text-[#666666] font-[family-name:var(--font-geist-sans)]">
                    {joinedDate}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Demotion confirmation dialog */}
      {pending && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleCancel}
          />

          {/* Panel */}
          <div className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-[#CBCCC9] w-full max-w-[480px] mx-4">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-[#CBCCC9]">
              <h2
                id="dialog-title"
                className="text-lg font-bold text-[#111111] font-[family-name:var(--font-jetbrains-mono)]"
              >
                ロールを変更しますか？
              </h2>
              <p className="mt-2 text-sm text-[#666666] font-[family-name:var(--font-geist-sans)]">
                <strong className="text-[#111111]">{pending.member.name}</strong> を{' '}
                <strong>{pending.member.role}</strong> → <strong>{pending.nextRole}</strong> に変更します。
              </p>
              <p className="mt-1 text-sm text-[#666666] font-[family-name:var(--font-geist-sans)]">
                この操作により、このメンバーが担当するタスクが<strong className="text-[#111111]">自動的に未アサイン</strong>になります。
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="h-9 px-5 rounded-lg border border-[#CBCCC9] bg-transparent text-sm font-semibold text-[#111111] hover:bg-[#F2F3F0] transition-colors disabled:opacity-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isPending}
                className="h-9 px-5 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPending && (
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                変更する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
