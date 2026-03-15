'use client'

import { useWizardStore } from '@/client/store/wizardStore'

const MAX_NAME = 50
const MAX_OVERVIEW = 500

export function StepProjectInfo() {
  const { projectName, projectOverview, setProjectInfo } = useWizardStore()

  return (
    <div className="flex-1 overflow-y-auto p-10 bg-[#F2F3F0]">
      <div className="flex flex-col gap-7 max-w-xl">
        {/* プロジェクト名 */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="project-name" className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            プロジェクト名 <span className="text-[#FF8400]">*</span>
          </label>
          <input
            id="project-name"
            type="text"
            value={projectName}
            onChange={(e) => setProjectInfo(e.target.value, projectOverview)}
            maxLength={MAX_NAME}
            placeholder="例: スマート家計簿アプリ"
            className="rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow"
          />
          <p className="font-[family-name:var(--font-geist-sans)] text-[#CBCCC9] text-xs text-right">
            {projectName.length} / {MAX_NAME}
          </p>
        </div>

        {/* プロジェクト概要 */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="project-overview" className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            プロジェクト概要 <span className="text-[#FF8400]">*</span>
          </label>
          <textarea
            id="project-overview"
            value={projectOverview}
            onChange={(e) => setProjectInfo(projectName, e.target.value)}
            maxLength={MAX_OVERVIEW}
            rows={6}
            placeholder="例: 収支の記録・グラフ表示・AIによる節約アドバイスができる家計簿アプリを開発します。"
            className="rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow resize-none"
          />
          <p className="font-[family-name:var(--font-geist-sans)] text-[#CBCCC9] text-xs text-right">
            {projectOverview.length} / {MAX_OVERVIEW}
          </p>
        </div>
      </div>
    </div>
  )
}
