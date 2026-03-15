'use client'

import { create } from 'zustand'
import type { WizardState, ProductType, ExperienceLevel } from '@/types/requirements'

type WizardActions = {
  setProjectInfo: (name: string, overview: string) => void
  setProductType: (v: ProductType) => void
  toggleFeature: (name: string) => void
  toggleTechStack: (name: string) => void
  setTeamScale: (data: {
    memberCount: number | null
    startDate: string
    releaseDate: string
    experienceLevel: ExperienceLevel | null
  }) => void
  setFreeText: (text: string) => void
  setSupplementUrl: (url: string) => void
  goToStep: (step: WizardState['currentStep']) => void
  nextStep: () => void
  prevStep: () => void
  setIsSubmitting: (v: boolean) => void
  reset: () => void
}

const initialState: WizardState = {
  projectName: '',
  projectOverview: '',
  productType: null,
  selectedFeatures: [],
  techStack: [],
  memberCount: null,
  startDate: '',
  releaseDate: '',
  experienceLevel: null,
  freeText: '',
  supplementUrl: '',
  currentStep: 1,
  isSubmitting: false,
}

export const useWizardStore = create<WizardState & WizardActions>()((set, get) => ({
  ...initialState,

  setProjectInfo: (name, overview) =>
    set({ projectName: name, projectOverview: overview }),

  setProductType: (v) =>
    set({ productType: v, selectedFeatures: [] }),

  toggleFeature: (name) => {
    const { selectedFeatures } = get()
    const next = selectedFeatures.includes(name)
      ? selectedFeatures.filter((f) => f !== name)
      : [...selectedFeatures, name]
    set({ selectedFeatures: next })
  },

  toggleTechStack: (name) => {
    const { techStack } = get()
    const next = techStack.includes(name)
      ? techStack.filter((t) => t !== name)
      : [...techStack, name]
    set({ techStack: next })
  },

  setTeamScale: (data) =>
    set({
      memberCount:     data.memberCount,
      startDate:       data.startDate,
      releaseDate:     data.releaseDate,
      experienceLevel: data.experienceLevel,
    }),

  setFreeText: (text) => set({ freeText: text }),
  setSupplementUrl: (url) => set({ supplementUrl: url }),

  goToStep: (step) => set({ currentStep: step }),

  nextStep: () => {
    const { currentStep } = get()
    if (currentStep < 7) {
      set({ currentStep: (currentStep + 1) as WizardState['currentStep'] })
    }
  },

  prevStep: () => {
    const { currentStep } = get()
    if (currentStep > 1) {
      set({ currentStep: (currentStep - 1) as WizardState['currentStep'] })
    }
  },

  setIsSubmitting: (v) => set({ isSubmitting: v }),

  reset: () => set(initialState),
}))
