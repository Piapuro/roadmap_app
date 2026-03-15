import type { Metadata } from 'next'
import { WizardShell } from '@/client/components/requirements/WizardShell'

export const metadata: Metadata = {
  title: '要件定義 | ROADMAP AI',
  description: '要件定義ウィザードでプロダクトの要件を入力します',
}

export default function RequirementsNewPage() {
  return <WizardShell />
}
