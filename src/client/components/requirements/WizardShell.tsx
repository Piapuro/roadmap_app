'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { useWizardStore } from '@/client/store/wizardStore'
import { useWizard } from '@/client/hooks/useWizard'
import { saveRequirement } from '@/server/actions/requirements'
import { ReqWizardSidebar } from './ReqWizardSidebar'
import { ReqWizardStepper } from './ReqWizardStepper'
import { StepProjectInfo } from './StepProjectInfo'
import { Step1ProductType } from './Step1ProductType'
import { Step2FeatureCheck } from './Step2FeatureCheck'
import { StepTechStack } from './StepTechStack'
import { Step3TeamScale } from './Step3TeamScale'
import { Step4FreeText } from './Step4FreeText'
import { Step5Confirm } from './Step5Confirm'

const STEP_CONFIG = [
  { title: 'プロジェクト情報を入力',   desc: 'プロジェクト名と概要を入力してください。' },
  { title: 'プロダクト種別を選択',     desc: 'どの種別のプロダクトを開発しますか？' },
  { title: '機能・要件を選択',         desc: '実装したい機能を選択してください。AIがタスクと優先度を自動設定します。' },
  { title: '技術スタックを選択',       desc: '使用する技術・フレームワークを選択してください。' },
  { title: 'チーム・規模を設定',       desc: 'チームの人数・開発期間・経験レベルを入力してください。' },
  { title: '補足情報を入力',           desc: '補足メモや参考URLを入力してください（任意）。' },
  { title: '確認・AI分析を開始',       desc: '入力内容を確認して、AI分析を開始してください。' },
]

export function WizardShell() {
  const router = useRouter()
  const {
    currentStep,
    isSubmitting,
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
    nextStep,
    prevStep,
    setIsSubmitting,
  } = useWizardStore()
  const { validateStep } = useWizard()
  const [errors, setErrors] = useState<Record<string, string>>({})

  // TODO: Supabase セッションから teamId を取得する（#006 マージ後に置き換え）
  const [teamId, setTeamId] = useState('')
  useEffect(() => {
    setTeamId(localStorage.getItem('team_id') ?? '')
  }, [])

  const stepIndex = currentStep - 1
  const config = STEP_CONFIG[stepIndex]
  const isFinalStep = currentStep === 7

  async function handleNext() {
    const result = validateStep(currentStep)
    if (!result.valid) {
      setErrors(result.errors)
      return
    }
    setErrors({})

    if (isFinalStep) {
      if (!productType || !memberCount || !startDate || !releaseDate || !experienceLevel) return
      if (!teamId) {
        setErrors({ form: 'チームIDが取得できませんでした。ページを再読み込みしてください。' })
        return
      }
      setIsSubmitting(true)
      try {
        await saveRequirement({
          teamId,
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
        })
        router.push('/ai-loading')
      } catch {
        setIsSubmitting(false)
      }
      return
    }

    nextStep()
  }

  function handlePrev() {
    setErrors({})
    prevStep()
  }

  const errorMessage = Object.values(errors)[0]

  return (
    <div className="flex h-screen bg-[#F2F3F0]">
      <ReqWizardSidebar currentStep={currentStep} />

      <main className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex flex-col gap-5 px-10 py-8 bg-[#F2F3F0] border-b border-[#CBCCC9] shrink-0">
          <ReqWizardStepper currentStep={currentStep} />
          <div className="flex flex-col gap-1">
            <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[22px] font-bold">
              {config.title}
            </h1>
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
              {config.desc}
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          {currentStep === 1 && <StepProjectInfo />}
          {currentStep === 2 && <Step1ProductType />}
          {currentStep === 3 && <Step2FeatureCheck />}
          {currentStep === 4 && <StepTechStack />}
          {currentStep === 5 && <Step3TeamScale />}
          {currentStep === 6 && <Step4FreeText />}
          {currentStep === 7 && <Step5Confirm />}
        </div>

        {/* Footer */}
        <footer className="flex items-center gap-3 px-10 py-5 bg-[#F2F3F0] border-t border-[#CBCCC9] shrink-0">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-lg border border-[#CBCCC9] px-6 py-3 text-sm font-semibold text-[#111111] hover:bg-[#e5e6e3] transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4" />
              前へ
            </button>
          )}

          {errorMessage && (
            <p role="alert" className="font-[family-name:var(--font-geist-sans)] text-red-500 text-xs">
              {errorMessage}
            </p>
          )}

          <div className="flex-1" />

          <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-xs">
            ステップ {currentStep} / 7
          </span>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-[#FF8400] px-6 py-3 text-sm font-semibold text-[#111111] hover:bg-[#e67700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-[#111111]/30 border-t-[#111111] rounded-full animate-spin" />
                送信中...
              </>
            ) : isFinalStep ? (
              <>
                <Sparkles className="w-4 h-4" />
                AI分析を開始
              </>
            ) : (
              <>
                次へ
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </footer>
      </main>
    </div>
  )
}
