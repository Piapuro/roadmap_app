// Server Component — 新規登録ページ
import type { Metadata } from "next";
import Link from "next/link";
import { Rocket } from "lucide-react";
import { RegisterForm } from "@/client/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "新規登録 | Roadmap AI",
  description: "無料でアカウントを作成しましょう",
};

const STEPS = [
  { num: "1", label: "アカウントを作成", active: true },
  { num: "2", label: "チームを設定", active: false },
  { num: "3", label: "要件を入力してAI生成開始", active: false },
];

export default function RegisterPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex w-[480px] shrink-0 flex-col justify-between bg-primary p-16 text-primary-foreground">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <Rocket className="w-7 h-7" strokeWidth={1.5} />
          <span className="font-heading text-lg font-bold tracking-tight">
            ROADMAP AI
          </span>
        </Link>

        {/* Hero */}
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-[40px] font-bold leading-[1.15] whitespace-pre-line">
            {"今日から\nチーム開発を\n始めよう"}
          </h1>
          <p className="font-sans text-sm leading-[1.7]">
            AIがあなたのプロジェクトに最適なロードマップを自動生成。チーム全員で進捗を共有できます。
          </p>
        </div>

        {/* Steps */}
        <ol className="flex flex-col gap-5">
          {STEPS.map((step) => (
            <li key={step.num} className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={
                  step.active
                    ? { backgroundColor: "#111111" }
                    : { border: "1px solid rgba(255,255,255,0.38)" }
                }
              >
                <span
                  className="font-heading text-xs font-bold"
                  style={{ color: step.active ? "#FF8400" : "inherit" }}
                >
                  {step.num}
                </span>
              </div>
              <span
                className="font-sans text-sm"
                style={{ opacity: step.active ? 1 : 0.6 }}
              >
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Right: Form panel */}
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-16 md:px-[72px] bg-background">
        <div className="w-full max-w-[560px] mx-auto flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-[28px] font-bold leading-[1.2]">
              アカウント作成
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-[1.5]">
              無料で始めましょう。クレジットカード不要。
            </p>
          </div>

          {/* Form (Client Component) */}
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
