'use client'

import { useState } from 'react'
import { Search, Check } from 'lucide-react'
import { cn } from '@/client/lib/cn'
import { useWizardStore } from '@/client/store/wizardStore'
import { TECH_STACK_LIST } from '@/client/constants/techStackList'

export function StepTechStack() {
  const { techStack, toggleTechStack } = useWizardStore()
  const [search, setSearch] = useState('')

  const allTech = TECH_STACK_LIST.flatMap((c) => c.features)
  const checkedCount = techStack.length

  const filteredCategories = TECH_STACK_LIST
    .map((cat) => ({
      ...cat,
      features: cat.features.filter((f) => !search || f.toLowerCase().includes(search.toLowerCase())),
    }))
    .filter((cat) => cat.features.length > 0)

  return (
    <div className="flex flex-1 min-h-0">
      {/* Left: tech list */}
      <div className="flex-1 flex flex-col gap-5 p-8 overflow-y-auto bg-[#F2F3F0]">
        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-full border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-2.5">
            <Search className="w-4 h-4 text-[#666666] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="技術を検索..."
              className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none"
            />
          </div>
          {checkedCount > 0 && (
            <div className="rounded-full bg-[#FF8400] px-3 py-1.5 text-xs font-semibold text-[#111111]">
              {checkedCount} 選択中
            </div>
          )}
        </div>

        {/* Category list */}
        {filteredCategories.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 py-2">
              <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                {cat.label}
              </span>
            </div>
            <div className="rounded-lg border border-[#CBCCC9] overflow-hidden">
              {cat.features.map((tech, idx) => {
                const isChecked = techStack.includes(tech)
                return (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => toggleTechStack(tech)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                      idx > 0 && 'border-t border-[#CBCCC9]',
                      isChecked ? 'bg-[#F2F3F0]' : 'bg-white'
                    )}
                  >
                    <div
                      className={cn(
                        'w-[18px] h-[18px] rounded flex items-center justify-center shrink-0',
                        isChecked
                          ? 'bg-[#FF8400] border border-[#FF8400]'
                          : 'border border-[#CBCCC9]'
                      )}
                    >
                      {isChecked && (
                        <Check className="w-3 h-3 text-[#111111]" strokeWidth={3} />
                      )}
                    </div>
                    <span
                      className={cn(
                        'font-[family-name:var(--font-geist-sans)] text-sm',
                        isChecked ? 'text-[#111111] font-medium' : 'text-[#666666]'
                      )}
                    >
                      {tech}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Right: selected panel */}
      <aside className="w-[340px] shrink-0 flex flex-col bg-white border-l border-[#CBCCC9]">
        <div className="flex flex-col gap-1 px-6 py-6 border-b border-[#CBCCC9] shrink-0">
          <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-bold">
            選択済み技術
          </h3>
          <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
            {checkedCount} / {allTech.length} 技術を選択中
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-[#CBCCC9] overflow-hidden">
            <div
              className="h-full bg-[#FF8400] rounded-full transition-all"
              style={{ width: `${allTech.length ? (checkedCount / allTech.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#CBCCC9]">
          {techStack.map((tech) => (
            <div key={tech} className="flex items-center gap-2 px-5 py-2.5">
              <Check className="w-4 h-4 text-[#22c55e] shrink-0" />
              <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm flex-1 min-w-0 truncate">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  )
}
