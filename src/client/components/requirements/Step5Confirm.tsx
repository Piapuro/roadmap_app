'use client'

import { Pencil, Sparkles } from 'lucide-react'
import { useWizardStore } from '@/client/store/wizardStore'
import { PRODUCT_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '@/types/requirements'

export function Step5Confirm() {
  const {
    projectName,
    projectOverview,
    productType,
    selectedFeatures,
    techStack,
    memberCount,
    startDate,
    releaseDate,
    experienceLevel,
    freeText,
    supplementUrl,
    goToStep,
  } = useWizardStore()

  return (
    <div className="flex flex-1 min-h-0">
      {/* Left: summary cards */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#F2F3F0] flex flex-col gap-4">

        {/* プロジェクト情報 */}
        <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              プロジェクト情報
            </span>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="flex items-center gap-1 text-[#666666] hover:text-[#FF8400] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-geist-sans)] text-xs">編集</span>
            </button>
          </div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[#FF8400] text-base font-bold">
            {projectName || '—'}
          </p>
          {projectOverview && (
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm leading-relaxed whitespace-pre-wrap">
              {projectOverview}
            </p>
          )}
        </div>

        {/* プロダクト種別 */}
        <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              プロダクト種別
            </span>
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="flex items-center gap-1 text-[#666666] hover:text-[#FF8400] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-geist-sans)] text-xs">編集</span>
            </button>
          </div>
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#FF8400] text-base font-bold">
            {productType ? PRODUCT_TYPE_LABELS[productType] : '—'}
          </span>
        </div>

        {/* 選択機能 */}
        <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              選択機能
            </span>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="flex items-center gap-1 text-[#666666] hover:text-[#FF8400] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-geist-sans)] text-xs">編集</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map((f) => (
              <span
                key={f}
                className="rounded-full border border-[#CBCCC9] bg-[#F2F3F0] px-3 py-1 text-xs font-[family-name:var(--font-geist-sans)] text-[#111111]"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* 技術スタック */}
        <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              技術スタック
            </span>
            <button
              type="button"
              onClick={() => goToStep(4)}
              className="flex items-center gap-1 text-[#666666] hover:text-[#FF8400] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-geist-sans)] text-xs">編集</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-[#CBCCC9] bg-[#F2F3F0] px-3 py-1 text-xs font-[family-name:var(--font-geist-sans)] text-[#111111]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* チーム・規模 */}
        <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              チーム・規模
            </span>
            <button
              type="button"
              onClick={() => goToStep(5)}
              className="flex items-center gap-1 text-[#666666] hover:text-[#FF8400] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-geist-sans)] text-xs">編集</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">人数</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                {memberCount ?? '—'} 人
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">開始日</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                {startDate || '—'}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">リリース日</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                {releaseDate || '—'}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">レベル</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                {experienceLevel ? EXPERIENCE_LEVEL_LABELS[experienceLevel] : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* 自由記述・補足 */}
        <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              自由記述・補足
            </span>
            <button
              type="button"
              onClick={() => goToStep(6)}
              className="flex items-center gap-1 text-[#666666] hover:text-[#FF8400] transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="font-[family-name:var(--font-geist-sans)] text-xs">編集</span>
            </button>
          </div>
          {freeText ? (
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm leading-relaxed whitespace-pre-wrap">
              {freeText}
            </p>
          ) : (
            <p className="font-[family-name:var(--font-geist-sans)] text-[#CBCCC9] text-sm italic">
              未入力
            </p>
          )}
          {supplementUrl && (
            <a
              href={supplementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-geist-sans)] text-[#FF8400] text-xs underline break-all"
            >
              {supplementUrl}
            </a>
          )}
        </div>
      </div>

      {/* Right: AI generation info */}
      <aside className="w-[300px] shrink-0 flex flex-col gap-4 p-8 bg-[#F2F3F0] border-l border-[#CBCCC9]">
        <div className="rounded-xl border-2 border-[#FF8400] bg-white p-6 flex flex-col gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FF8400]">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-base font-bold">
            AI生成の準備完了
          </p>
          <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm leading-relaxed">
            入力内容をもとにAIが最適なロードマップを自動生成します。生成には通常30〜60秒かかります。
          </p>
        </div>
        <div className="rounded-lg bg-[#F2F3F0] border border-[#CBCCC9] p-4 flex flex-col gap-2">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xs font-semibold">
            注意事項
          </p>
          <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs leading-relaxed">
            生成後は内容を編集できます。生成結果はプロジェクト設定から再生成も可能です。
          </p>
        </div>
      </aside>
    </div>
  )
}
