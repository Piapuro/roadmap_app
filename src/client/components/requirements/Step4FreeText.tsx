'use client'

import { cn } from '@/client/lib/cn'
import { useWizardStore } from '@/client/store/wizardStore'

const MAX_FREE_TEXT = 1000

export function Step4FreeText() {
  const { freeText, supplementUrl, setFreeText, setSupplementUrl } = useWizardStore()
  const remaining = MAX_FREE_TEXT - freeText.length

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#F2F3F0]">
      <div className="flex flex-col gap-7 max-w-xl">
        {/* 補足メモ */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="supplement-memo" className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
              補足メモ
              <span className="ml-2 text-[#666666] font-normal">（任意）</span>
            </label>
            <span
              className={cn(
                'font-[family-name:var(--font-jetbrains-mono)] text-xs',
                remaining < 0 ? 'text-red-500' : 'text-[#666666]'
              )}
            >
              残り {remaining} 文字
            </span>
          </div>
          <textarea
            id="supplement-memo"
            value={freeText}
            onChange={(e) => setFreeText(e.target.value)}
            maxLength={MAX_FREE_TEXT}
            placeholder="プロジェクトの目的・背景・制約条件など補足情報を入力してください..."
            rows={8}
            className="w-full rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] resize-none transition-shadow"
          />
        </div>

        {/* 参考URL */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="supplement-url" className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            参考URL
            <span className="ml-2 text-[#666666] font-normal">（任意）</span>
          </label>
          <input
            id="supplement-url"
            type="url"
            value={supplementUrl}
            onChange={(e) => setSupplementUrl(e.target.value)}
            placeholder="https://example.com/spec"
            className="w-full rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow"
          />
          <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
            仕様書・要件ドキュメント・参考サービスのURLを入力してください
          </p>
        </div>
      </div>
    </div>
  )
}
