export type ProductType = 'web' | 'app' | 'game' | 'ai'
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'
export type RequirementStatus = 'draft' | 'locked'

export type WizardState = {
  projectName: string
  projectOverview: string
  productType: ProductType | null
  selectedFeatures: string[]
  techStack: string[]
  memberCount: number | null
  startDate: string
  releaseDate: string
  experienceLevel: ExperienceLevel | null
  freeText: string
  supplementUrl: string
  currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7
  isSubmitting: boolean
}

export type Requirement = {
  id: string
  teamId: string
  projectName: string
  projectOverview: string
  productType: ProductType
  memberCount: number
  startDate: string
  releaseDate: string
  experienceLevel: ExperienceLevel
  freeText: string | null
  supplementUrl: string | null
  status: RequirementStatus
  features: { featureName: string; isRequired: boolean }[]
  techStack: string[]
  createdAt: string
  updatedAt: string
}

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  web: 'Webアプリ',
  app: 'モバイルアプリ',
  game: 'ゲーム',
  ai: 'AIプロダクト',
}

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  beginner: '初心者中心',
  intermediate: '混合',
  advanced: '経験者中心',
}

export const REQ_WIZARD_STEPS = [
  { id: 1 as const, stepperLabel: 'プロジェクト', sidebarLabel: 'プロジェクト情報' },
  { id: 2 as const, stepperLabel: '種別',         sidebarLabel: '種別選択' },
  { id: 3 as const, stepperLabel: '機能',         sidebarLabel: '機能・要件選択' },
  { id: 4 as const, stepperLabel: '技術',         sidebarLabel: '技術スタック' },
  { id: 5 as const, stepperLabel: 'チーム',       sidebarLabel: 'チーム・規模' },
  { id: 6 as const, stepperLabel: '補足',         sidebarLabel: '自由記述' },
  { id: 7 as const, stepperLabel: '確認・生成',   sidebarLabel: '確認・生成' },
]
