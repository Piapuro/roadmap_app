// Server Component
import type { Metadata } from "next";
import { WizardSidebar } from "@/client/components/setup/WizardSidebar";
import { WizardStepper } from "@/client/components/setup/WizardStepper";
import { HintPanel } from "@/client/components/setup/HintPanel";
import { ProjectInfoForm } from "@/client/components/setup/ProjectInfoForm";

export const metadata: Metadata = {
  title: "プロジェクト情報 | ROADMAP AI",
  description: "新しいプロジェクトの基本情報を設定します",
};

const STEP1_HINTS = [
  {
    title: "プロジェクト名のコツ",
    body: "機能・目的が伝わる具体的な名前にするとAIがより正確なロードマップを生成できます",
  },
  {
    title: "フェーズ構成について",
    body: "「標準」はMVP開発に最適なPhase 0〜3の4段階構成です。初めての方にはこちらをお勧めします",
  },
];

export default function SetupPage() {
  return (
    <div className="flex h-screen bg-[#F2F3F0]">
      <WizardSidebar currentStep={1} />

      <main className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex flex-col gap-5 px-10 py-8 bg-[#F2F3F0] border-b border-[#CBCCC9] shrink-0">
          <WizardStepper currentStep={1} />
          <div className="flex flex-col gap-1">
            <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[22px] font-bold">
              プロジェクト情報を入力
            </h1>
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
              新しいプロジェクトの基本情報を設定します。後から変更することも可能です。
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto">
            <ProjectInfoForm />
          </div>
          <HintPanel hints={STEP1_HINTS} />
        </div>
      </main>
    </div>
  );
}
