export type PhaseOption = "standard" | "simple" | "custom";

export interface ProjectInfo {
  name: string;
  description: string;
  phase: PhaseOption;
  targetReleaseDate: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  phase: string;
  checked: boolean;
}

export interface WizardStepConfig {
  id: number;
  stepperLabel: string;
  sidebarLabel: string;
}

export const WIZARD_STEPS: WizardStepConfig[] = [
  { id: 1, stepperLabel: "プロジェクト情報", sidebarLabel: "プロジェクト情報" },
  { id: 2, stepperLabel: "機能・要件",       sidebarLabel: "機能・要件選択" },
  { id: 3, stepperLabel: "チーム設定",       sidebarLabel: "チーム設定" },
  { id: 4, stepperLabel: "技術スタック",     sidebarLabel: "技術スタック" },
  { id: 5, stepperLabel: "確認・生成",       sidebarLabel: "確認・生成" },
];
