'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/client/lib/cn'
import { useWizardStore } from '@/client/store/wizardStore'
import { PRODUCT_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS, type ExperienceLevel } from '@/types/requirements'

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string; description: string }[] = [
  { value: 'beginner',     label: '初心者中心',  description: '開発経験が少ないメンバーが多い' },
  { value: 'intermediate', label: '混合',        description: '経験者と初心者が混在している' },
  { value: 'advanced',     label: '経験者中心',  description: '経験豊富なメンバーが多い' },
]

export function Step3TeamScale() {
  const { productType, selectedFeatures, memberCount, startDate, releaseDate, experienceLevel, setTeamScale } =
    useWizardStore()

  const [localMember, setLocalMember] = useState(memberCount?.toString() ?? '')
  const [localStartDate, setLocalStartDate] = useState(startDate)
  const [localReleaseDate, setLocalReleaseDate] = useState(releaseDate)

  function toIntOrNull(s: string): number | null {
    return s === '' ? null : parseInt(s, 10)
  }

  useEffect(() => {
    setTeamScale({
      memberCount: toIntOrNull(localMember),
      startDate: localStartDate,
      releaseDate: localReleaseDate,
      experienceLevel,
    })
  }, [localMember, localStartDate, localReleaseDate, experienceLevel, setTeamScale])

  function handleExperience(v: ExperienceLevel) {
    setTeamScale({
      memberCount: toIntOrNull(localMember),
      startDate: localStartDate,
      releaseDate: localReleaseDate,
      experienceLevel: v,
    })
  }

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#F2F3F0]">
      {/* Confirmation bar */}
      {productType && (
        <div className="flex items-center gap-3 mb-8 px-4 py-3 rounded-lg bg-white border border-[#CBCCC9]">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
            プロダクト種別:
          </span>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
            {PRODUCT_TYPE_LABELS[productType]}
          </span>
          <span className="text-[#CBCCC9]">｜</span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
            選択機能:
          </span>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
            {selectedFeatures.length} 件
          </span>
        </div>
      )}

      <div className="flex flex-col gap-7 max-w-xl">
        {/* メンバー人数 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            メンバー人数 <span className="text-[#FF8400]">*</span>
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={20}
              value={localMember}
              onChange={(e) => setLocalMember(e.target.value)}
              placeholder="例: 4"
              className="w-32 rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow"
            />
            <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
              人（1〜20）
            </span>
          </div>
        </div>

        {/* 開発開始日 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            開発開始日 <span className="text-[#FF8400]">*</span>
          </label>
          <input
            type="date"
            value={localStartDate}
            onChange={(e) => setLocalStartDate(e.target.value)}
            className="w-52 rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow"
          />
        </div>

        {/* 目標リリース日 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            目標リリース日 <span className="text-[#FF8400]">*</span>
          </label>
          <input
            type="date"
            value={localReleaseDate}
            min={localStartDate || undefined}
            onChange={(e) => setLocalReleaseDate(e.target.value)}
            className="w-52 rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow"
          />
        </div>

        {/* 経験レベル */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            チーム経験レベル <span className="text-[#FF8400]">*</span>
          </label>
          <div className="flex flex-col gap-3">
            {EXPERIENCE_OPTIONS.map((opt) => {
              const isSelected = experienceLevel === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleExperience(opt.value)}
                  className={cn(
                    'flex flex-col gap-1.5 rounded-lg border px-4 py-3.5 text-left transition-colors',
                    isSelected
                      ? 'border-[#FF8400] bg-[#ff840010]'
                      : 'border-[#CBCCC9] bg-[#F2F3F0]'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'w-4 h-4 rounded-full shrink-0',
                        isSelected
                          ? 'border-4 border-[#FF8400]'
                          : 'border-2 border-[#CBCCC9] bg-[#F2F3F0]'
                      )}
                    />
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-[#111111]">
                      {opt.label}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs ml-6">
                    {opt.description}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
