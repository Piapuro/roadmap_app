'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { cn } from '@/client/lib/cn'
import { updateTeamSettings } from '@/server/actions/team'
import { LEVEL_LABEL } from '@/types/team'
import type { TeamLevel, TeamSettings } from '@/types/team'

const LEVELS: TeamLevel[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']

// TODO: replace with Supabase session (#006)
const MOCK_TEAM_ID = 'mock-team-id'

type FormState = {
  name: string
  startDate: string
  endDate: string
  goal: string
  level: TeamLevel
}

type FieldErrors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {}
  if (!form.name.trim())       errors.name      = 'チーム名を入力してください'
  if (!form.startDate)         errors.startDate = '開始日を入力してください'
  if (!form.endDate)           errors.endDate   = '終了日を入力してください'
  if (form.startDate && form.endDate && form.endDate < form.startDate)
                               errors.endDate   = '終了日は開始日より後にしてください'
  return errors
}

type Props = {
  initialSettings: TeamSettings
}

export function TeamSettingsForm({ initialSettings }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    name:      initialSettings.name,
    startDate: initialSettings.startDate,
    endDate:   initialSettings.endDate,
    goal:      initialSettings.goal,
    level:     initialSettings.level,
  })
  const [errors, setErrors] = useState<FieldErrors>({})
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleChange(field: keyof FormState, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
    setSuccess(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setError(null)
    setSuccess(false)
    startTransition(async () => {
      try {
        await updateTeamSettings({
          teamId:    MOCK_TEAM_ID,
          name:      form.name.trim(),
          startDate: form.startDate,
          endDate:   form.endDate,
          goal:      form.goal,
          level:     form.level,
        })
        setSuccess(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'チーム設定の更新に失敗しました')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

      {/* Error banner */}
      {error && (
        <div role="alert" className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-600 font-[family-name:var(--font-geist-sans)]">{error}</p>
          <button type="button" onClick={() => setError(null)} aria-label="エラーを閉じる">
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>
      )}

      {/* Success banner */}
      {success && (
        <div role="status" className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
          <p className="text-sm text-green-700 font-[family-name:var(--font-geist-sans)]">チーム設定を保存しました</p>
        </div>
      )}

      {/* Settings card */}
      <div className="bg-white rounded-2xl border border-[#CBCCC9] shadow-[0_4px_24px_rgba(0,0,0,0.08)]">

        {/* Card header */}
        <div className="px-7 py-6 border-b border-[#CBCCC9]">
          <h2 className="text-[15px] font-semibold text-[#111111] font-[family-name:var(--font-jetbrains-mono)]">
            基本情報
          </h2>
          <p className="mt-1 text-sm text-[#666666] font-[family-name:var(--font-geist-sans)]">
            変更後は「保存する」を押してください。
          </p>
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-6 px-7 py-7">

          {/* チーム名 */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="team-name"
              className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
            >
              チーム名
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              id="team-name"
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="例: Roadmap AI Dev Team"
              maxLength={100}
              className={cn(
                'h-10 w-full rounded-full border bg-[#F2F3F0] px-4 text-sm text-[#111111] placeholder:text-[#999999] outline-none transition-colors font-[family-name:var(--font-geist-sans)]',
                errors.name
                  ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                  : 'border-[#CBCCC9] focus:border-[#FF8400] focus:ring-2 focus:ring-[#FF8400]/20'
              )}
            />
            {errors.name && (
              <p role="alert" className="text-xs text-red-500 font-[family-name:var(--font-geist-sans)]">{errors.name}</p>
            )}
          </div>

          {/* 期間 */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label
                htmlFor="team-start"
                className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
              >
                開始日
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="team-start"
                type="date"
                value={form.startDate}
                onChange={e => handleChange('startDate', e.target.value)}
                className={cn(
                  'h-10 w-full rounded-full border bg-[#F2F3F0] px-4 text-sm text-[#111111] outline-none transition-colors font-[family-name:var(--font-geist-sans)]',
                  errors.startDate
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-[#CBCCC9] focus:border-[#FF8400] focus:ring-2 focus:ring-[#FF8400]/20'
                )}
              />
              {errors.startDate && (
                <p role="alert" className="text-xs text-red-500 font-[family-name:var(--font-geist-sans)]">{errors.startDate}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              <label
                htmlFor="team-end"
                className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
              >
                終了日
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="team-end"
                type="date"
                value={form.endDate}
                onChange={e => handleChange('endDate', e.target.value)}
                className={cn(
                  'h-10 w-full rounded-full border bg-[#F2F3F0] px-4 text-sm text-[#111111] outline-none transition-colors font-[family-name:var(--font-geist-sans)]',
                  errors.endDate
                    ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                    : 'border-[#CBCCC9] focus:border-[#FF8400] focus:ring-2 focus:ring-[#FF8400]/20'
                )}
              />
              {errors.endDate && (
                <p role="alert" className="text-xs text-red-500 font-[family-name:var(--font-geist-sans)]">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* 目標 */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="team-goal"
              className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
            >
              目標
            </label>
            <textarea
              id="team-goal"
              value={form.goal}
              onChange={e => handleChange('goal', e.target.value)}
              placeholder="例: MVP完成・チームスキルアップ・プロダクトリリース"
              rows={3}
              className="w-full rounded-xl border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-2.5 text-sm text-[#111111] placeholder:text-[#999999] outline-none transition-colors focus:border-[#FF8400] focus:ring-2 focus:ring-[#FF8400]/20 resize-none font-[family-name:var(--font-geist-sans)]"
            />
          </div>

          {/* レベル */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="team-level"
              className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
            >
              レベル
            </label>
            <div className="relative">
              <select
                id="team-level"
                value={form.level}
                onChange={e => handleChange('level', e.target.value as TeamLevel)}
                className="h-10 w-full appearance-none rounded-full border border-[#CBCCC9] bg-[#F2F3F0] px-4 pr-10 text-sm text-[#111111] outline-none transition-colors focus:border-[#FF8400] focus:ring-2 focus:ring-[#FF8400]/20 cursor-pointer font-[family-name:var(--font-geist-sans)]"
              >
                {LEVELS.map(lv => (
                  <option key={lv} value={lv}>{LEVEL_LABEL[lv]}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Card footer */}
        <div className="flex items-center justify-end gap-3 px-7 py-5 border-t border-[#CBCCC9]">
          <button
            type="button"
            onClick={() => router.push('/team')}
            disabled={isPending}
            className="h-9 px-5 rounded-full border border-[#CBCCC9] bg-transparent text-sm font-semibold text-[#111111] hover:bg-[#F2F3F0] transition-colors disabled:opacity-50 font-[family-name:var(--font-geist-sans)]"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="h-9 px-5 rounded-full bg-[#FF8400] text-sm font-semibold text-white hover:bg-[#e67600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-[family-name:var(--font-geist-sans)]"
          >
            {isPending && (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            保存する
          </button>
        </div>

      </div>
    </form>
  )
}
