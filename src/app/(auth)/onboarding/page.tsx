// Server Component — オンボーディング・スキル登録ページ
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { cn } from "@/client/lib/cn";
import { SkillsForm } from "@/client/components/onboarding/SkillsForm";

export const metadata: Metadata = {
  title: "スキル登録 | Roadmap AI",
  description: "あなたの得意技術と習熟度を教えてください",
};

const STEPS = [
  { num: "1", label: "アカウント作成", done: true, active: false },
  { num: "2", label: "スキル登録", done: false, active: true },
  { num: "3", label: "チーム設定", done: false, active: false },
];

export default function OnboardingPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex w-[480px] shrink-0 flex-col justify-between bg-primary p-16 text-primary-foreground">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <MapPin className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-heading text-lg font-bold tracking-tight">Roadmap</span>
        </Link>

        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-[36px] font-bold leading-[1.2] whitespace-pre-line">
            {"ようこそ！\nまずスキルを\n教えてください"}
          </h1>
          <p className="font-sans text-sm leading-[1.6] opacity-85">
            あなたのスキルに合わせてAIが最適なタスクとロードマップを生成します
          </p>
        </div>

        <ol className="flex flex-col gap-3.5">
          {STEPS.map((step) => (
            <li key={step.num} className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 text-xs font-bold font-heading",
                  step.done
                    ? "bg-green-500 text-white"
                    : step.active
                      ? "bg-foreground text-primary"
                      : "bg-foreground/30 text-primary-foreground"
                )}
              >
                {step.done ? "✓" : step.num}
              </div>
              <span
                className={cn(
                  "font-sans text-sm",
                  step.active ? "font-semibold" : "opacity-60"
                )}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Right: Form panel */}
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-12 md:px-[72px] bg-background">
        <div className="w-full max-w-[560px] mx-auto">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col gap-6">
            {/* Mini brand */}
            <Link href="/" className="flex items-center gap-2 w-fit">
              <MapPin className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-heading text-lg font-bold">Roadmap</span>
            </Link>

            {/* Heading */}
            <div className="flex flex-col gap-1.5">
              <h2 className="font-heading text-2xl font-bold">スキルを登録しましょう</h2>
              <p className="font-sans text-sm text-muted-foreground">
                あなたの得意技術と習熟度を教えてください。後から変更できます。
              </p>
            </div>

            <SkillsForm />
          </div>
        </div>
      </div>
    </div>
  );
}
