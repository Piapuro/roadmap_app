// Server Component
import type { Metadata } from "next";
import { WizardSidebar } from "@/client/components/setup/WizardSidebar";
import { WizardStepper } from "@/client/components/setup/WizardStepper";
import { FeaturesForm } from "@/client/components/setup/FeaturesForm";

export const metadata: Metadata = {
  title: "機能・要件選択 | ROADMAP AI",
  description: "実装したい機能を選択してください",
};

export default function FeaturesPage() {
  return (
    <div className="flex h-screen bg-[#F2F3F0]">
      <WizardSidebar currentStep={2} />

      <main className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="flex flex-col gap-5 px-10 py-8 bg-[#F2F3F0] border-b border-[#CBCCC9] shrink-0">
          <WizardStepper currentStep={2} />
          <div className="flex flex-col gap-1">
            <h1 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[22px] font-bold">
              機能・要件を選択
            </h1>
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
              実装したい機能を選択してください。AIがタスクと優先度を自動設定します。
            </p>
          </div>
        </header>

        {/* Body */}
        <div className="flex flex-1 min-h-0">
          <FeaturesForm />
        </div>
      </main>
    </div>
  );
}
