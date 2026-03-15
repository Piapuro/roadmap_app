'use client'

import { Check } from 'lucide-react'
import { cn } from '@/client/lib/cn'
import { useWizardStore } from '@/client/store/wizardStore'
import type { ProductType } from '@/types/requirements'

const PRODUCT_OPTIONS: {
  value: ProductType
  label: string
  description: string
  icon: string
}[] = [
  {
    value: 'web',
    label: 'Webアプリ',
    description: 'ブラウザで動作するWebアプリケーション。SaaS・ダッシュボード・ECなど',
    icon: '🌐',
  },
  {
    value: 'app',
    label: 'モバイルアプリ',
    description: 'iOS/Android向けのモバイルアプリ。通知・カメラ・位置情報連携など',
    icon: '📱',
  },
  {
    value: 'game',
    label: 'ゲーム',
    description: 'ゲームアプリ。スコア管理・マルチプレイ・課金システムなど',
    icon: '🎮',
  },
  {
    value: 'ai',
    label: 'AIプロダクト',
    description: 'AI・機械学習を活用したプロダクト。推論API連携・データ管理など',
    icon: '🤖',
  },
]

export function Step1ProductType() {
  const { productType, setProductType } = useWizardStore()

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#F2F3F0]">
      <div className="grid grid-cols-2 gap-4 max-w-2xl">
        {PRODUCT_OPTIONS.map((opt) => {
          const isSelected = productType === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setProductType(opt.value)}
              className={cn(
                'relative flex flex-col gap-3 rounded-xl border-2 px-6 py-5 text-left transition-all',
                isSelected
                  ? 'border-[#FF8400] bg-[#fff7ed]'
                  : 'border-[#CBCCC9] bg-white hover:border-[#FF8400]/50'
              )}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 flex items-center justify-center w-5 h-5 rounded-full bg-[#FF8400]">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              )}
              <span className="text-3xl">{opt.icon}</span>
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-base font-bold">
                {opt.label}
              </span>
              <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm leading-relaxed">
                {opt.description}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
