// Server Component — ログインページ
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Compass } from "lucide-react";
import { LoginForm } from "@/client/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "ログイン | Roadmap AI",
  description: "アカウントにサインインしてください",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex w-[560px] shrink-0 flex-col justify-between bg-primary p-16 text-primary-foreground">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <Compass className="w-9 h-9" strokeWidth={2} />
          <span className="font-heading text-[22px] font-bold tracking-tight">
            ROADMAP AI
          </span>
        </Link>

        {/* Hero */}
        <div className="flex flex-col gap-5">
          <h1 className="font-heading text-[44px] font-bold leading-[1.15] whitespace-pre-line">
            {"チーム開発を\n科学する"}
          </h1>
          <p className="font-sans text-base leading-[1.7]">
            AIがチームのスキルを分析し、最適なロードマップ・タスク分解・担当割り振りを自動生成。初心者でも迷わず開発を進められます。
          </p>
          {/* Stats */}
          <div className="flex gap-8">
            <div className="flex flex-col gap-1">
              <span className="font-heading text-[28px] font-bold">71+</span>
              <span className="font-sans text-xs">自動生成機能</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-heading text-[28px] font-bold">Phase 0</span>
              <span className="font-sans text-xs">2〜3週間でMVP</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-3">
          {[
            "スキルベース自動タスク割り振り",
            "個人別学習ロードマップ自動生成",
            "カンバン・ガントチャートで進捗管理",
          ].map((feat) => (
            <li key={feat} className="flex items-center gap-2.5">
              <CheckCircle2 className="w-[18px] h-[18px] shrink-0" strokeWidth={2} />
              <span className="font-sans text-sm leading-[1.4]">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Form panel */}
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-8 py-16 md:px-[72px] bg-background">
        <div className="w-full max-w-[400px] mx-auto flex flex-col gap-7">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-[28px] font-bold leading-[1.2]">
              ログイン
            </h2>
            <p className="font-sans text-sm text-muted-foreground leading-[1.5]">
              アカウントにサインインしてください
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 rounded-full bg-secondary p-1 w-fit">
            <span className="px-3 py-1.5 rounded-full bg-card text-sm font-medium shadow-sm text-foreground">
              ログイン
            </span>
            <Link
              href="/register"
              className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              新規登録
            </Link>
          </div>

          {/* Form (Client Component) */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
