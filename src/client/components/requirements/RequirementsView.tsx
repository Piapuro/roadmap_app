'use client'

import { cn } from '@/client/lib/cn'
import type { Requirement } from '@/types/requirements'
import { PRODUCT_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '@/types/requirements'

interface RequirementsViewProps {
  requirement: Requirement
}

export function RequirementsView({ requirement }: RequirementsViewProps) {
  const updatedAt = new Date(requirement.updatedAt).toLocaleDateString('ja-JP')
  const statusLabel = requirement.status === 'locked' ? '確定済み' : '生成済み（下書き）'
  const statusColor = requirement.status === 'locked' ? 'text-[#6d28d9]' : 'text-[#16a34a]'

  return (
    <div className="flex flex-col h-full gap-5 p-7 bg-[#F2F3F0] overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
            チーム &gt; 要件定義
          </span>
          <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xl font-bold">
            要件定義
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#CBCCC9] bg-white px-4 py-2 text-sm font-medium text-[#111111] hover:bg-[#F2F3F0] transition-colors"
          >
            AIで再生成
          </button>
          <button
            type="button"
            disabled={requirement.status === 'locked'}
            className="flex items-center gap-2 rounded-lg bg-[#FF8400] px-4 py-2 text-sm font-semibold text-[#111111] hover:bg-[#e67700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={requirement.status === 'locked' ? 'ロードマップ確定後は編集できません' : undefined}
          >
            要件を編集
          </button>
        </div>
      </div>

      {/* Summary bar: 人数/期間/レベル（#006 修正: 旧「難易度/規模」から変更） */}
      <div className="flex items-center gap-6 rounded-xl border border-[#CBCCC9] bg-white px-5 py-4">
        <div className="flex flex-col gap-1 flex-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
            プロダクト種別
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#6d28d9] text-sm font-semibold">
            {PRODUCT_TYPE_LABELS[requirement.productType]}
          </span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
            人数
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-semibold">
            {requirement.memberCount} 人
          </span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
            リリース日
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-semibold">
            {requirement.releaseDate}
          </span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
            経験レベル
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#ea580c] text-sm font-semibold">
            {EXPERIENCE_LEVEL_LABELS[requirement.experienceLevel]}
          </span>
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
            最終更新
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm">
            {updatedAt}
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Left column */}
        <div className="flex flex-col gap-4 flex-1 min-h-0 overflow-y-auto">
          {/* 機能一覧 */}
          <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-4 border-b border-[#CBCCC9]">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                機能一覧
              </span>
              <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
                {requirement.features.filter((f) => f.isRequired).length} 機能選択済み
              </span>
            </div>
            <div className="flex flex-col">
              {requirement.features.map((feature) => (
                <div
                  key={feature.featureName}
                  className="flex items-center gap-2.5 py-2.5 border-b border-[#F2F3F0] last:border-0"
                >
                  {feature.isRequired ? (
                    <span className="text-[#16a34a] font-bold text-sm w-4">✓</span>
                  ) : (
                    <span className="text-[#CBCCC9] text-sm w-4">○</span>
                  )}
                  <span
                    className={cn(
                      'font-[family-name:var(--font-geist-sans)] text-sm',
                      feature.isRequired ? 'text-[#111111]' : 'text-[#666666]'
                    )}
                  >
                    {feature.featureName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 自由記述・補足 */}
          <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3 flex-1">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              自由記述・補足
            </span>
            {requirement.freeText ? (
              <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm leading-relaxed whitespace-pre-wrap">
                {requirement.freeText}
              </p>
            ) : (
              <p className="font-[family-name:var(--font-geist-sans)] text-[#CBCCC9] text-sm italic">
                未入力
              </p>
            )}
            {requirement.supplementUrl && (
              <a
                href={requirement.supplementUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-geist-sans)] text-[#FF8400] text-xs underline break-all"
              >
                {requirement.supplementUrl}
              </a>
            )}
          </div>
        </div>

        {/* Right column (360px) */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">
          {/* AI生成ステータス */}
          <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-3">
            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
              AI生成ステータス
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
                  最終生成
                </span>
                <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-xs">
                  {updatedAt}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
                  ステータス
                </span>
                <span className={cn('font-[family-name:var(--font-geist-sans)] text-xs font-semibold', statusColor)}>
                  {statusLabel}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-lg border border-[#CBCCC9] py-2 text-sm font-medium text-[#111111] hover:bg-[#F2F3F0] transition-colors"
            >
              ロードマップを再生成
            </button>
          </div>

          {/* AIレビュー結果 */}
          <div className="rounded-xl border border-[#CBCCC9] bg-white p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                AIレビュー結果
              </span>
              <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
                要件の品質チェック・ロードマップ評価
              </span>
            </div>

            <div className="h-px bg-[#CBCCC9]" />

            {/* 曖昧さ検出 */}
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#ea580c] text-xs font-semibold">
                曖昧さ検出
              </span>
              <div className="rounded-md bg-[#fff7ed] border border-[#fed7aa] p-2.5 flex flex-col gap-1">
                <p className="font-[family-name:var(--font-geist-sans)] text-[#9a3412] text-xs leading-relaxed">
                  AIレビュー結果はロードマップ生成後に表示されます。
                </p>
              </div>
            </div>

            <div className="h-px bg-[#CBCCC9]" />

            {/* MVP範囲提案 */}
            <div className="flex flex-col gap-2">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#16a34a] text-xs font-semibold">
                MVP範囲提案
              </span>
              <div className="rounded-md bg-[#f0fdf4] border border-[#bbf7d0] p-2.5 flex flex-col gap-1">
                <p className="font-[family-name:var(--font-geist-sans)] text-[#166534] text-xs font-semibold">
                  Phase 1 推奨スコープ
                </p>
                <p className="font-[family-name:var(--font-geist-sans)] text-[#166534] text-xs leading-relaxed">
                  ロードマップ生成後に表示されます。
                </p>
              </div>
            </div>

            <div className="h-px bg-[#CBCCC9]" />

            {/* ロードマップ評価 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs font-semibold">
                  ロードマップ評価
                </span>
                <span className="font-[family-name:var(--font-geist-sans)] text-[#CBCCC9] text-[10px]">
                  確定後に有効
                </span>
              </div>
              <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs leading-relaxed">
                ロードマップが確定されると、進捗バランスや担当偏りの評価が表示されます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
