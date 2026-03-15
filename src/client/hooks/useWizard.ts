'use client'

import { useWizardStore } from '@/client/store/wizardStore'
import type { WizardState } from '@/types/requirements'

type ValidationResult = { valid: boolean; errors: Record<string, string> }

export function useWizard() {
  const state = useWizardStore()

  function validateStep(step: WizardState['currentStep']): ValidationResult {
    const errors: Record<string, string> = {}

    if (step === 1) {
      if (!state.projectName.trim()) {
        errors.projectName = 'プロジェクト名を入力してください'
      } else if (state.projectName.length > 50) {
        errors.projectName = 'プロジェクト名は50文字以内で入力してください'
      }
      if (!state.projectOverview.trim()) {
        errors.projectOverview = 'プロジェクト概要を入力してください'
      } else if (state.projectOverview.length > 500) {
        errors.projectOverview = 'プロジェクト概要は500文字以内で入力してください'
      }
    }

    if (step === 2) {
      if (!state.productType) {
        errors.productType = 'プロダクト種別を選択してください'
      }
    }

    if (step === 3) {
      if (state.selectedFeatures.length === 0) {
        errors.selectedFeatures = '機能を1つ以上選択してください'
      }
    }

    if (step === 4) {
      if (state.techStack.length === 0) {
        errors.techStack = '技術スタックを1つ以上選択してください'
      }
    }

    if (step === 5) {
      if (
        !state.memberCount ||
        !Number.isInteger(state.memberCount) ||
        state.memberCount < 1 ||
        state.memberCount > 20
      ) {
        errors.memberCount = '人数は1〜20の整数で入力してください'
      }
      if (!state.startDate) {
        errors.startDate = '開発開始日を入力してください'
      }
      if (!state.releaseDate) {
        errors.releaseDate = '目標リリース日を入力してください'
      }
      if (state.startDate && state.releaseDate && state.startDate >= state.releaseDate) {
        errors.releaseDate = '目標リリース日は開発開始日より後の日付を設定してください'
      }
      if (!state.experienceLevel) {
        errors.experienceLevel = '経験レベルを選択してください'
      }
    }

    if (step === 6) {
      if (state.freeText.length > 1000) {
        errors.freeText = '1000文字以内で入力してください'
      }
      if (state.supplementUrl && !/^https:\/\/.+/.test(state.supplementUrl)) {
        errors.supplementUrl = 'URLはhttps://から始まる形式で入力してください'
      }
    }

    return { valid: Object.keys(errors).length === 0, errors }
  }

  return { state, validateStep }
}
