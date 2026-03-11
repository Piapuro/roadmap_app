"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/client/lib/cn";
import type { PhaseOption, ProjectInfo } from "@/types/setup";

const PHASE_OPTIONS: { value: PhaseOption; label: string; description: string }[] = [
  { value: "standard", label: "標準（推奨）", description: "Phase 0〜3の4フェーズ構成" },
  { value: "simple",   label: "シンプル",     description: "Phase 0〜1の2フェーズ構成" },
  { value: "custom",   label: "カスタム",      description: "フェーズ数を自由に設定" },
];

interface FormErrors {
  name?: string;
  description?: string;
}

export function ProjectInfoForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectInfo>({
    name: "",
    description: "",
    phase: "standard",
    targetReleaseDate: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "プロジェクト名は必須です";
    if (!form.description.trim()) next.description = "プロジェクト概要は必須です";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleNext() {
    if (!validate()) return;
    localStorage.setItem("setup_project_info", JSON.stringify(form));
    router.push("/setup/features");
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fields */}
      <div className="flex-1 flex flex-col gap-7 p-10 bg-[#F2F3F0] overflow-y-auto">
        {/* プロジェクト名 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            プロジェクト名 <span className="text-[#FF8400]">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="例: 開発ロードマップ自動生成ダッシュボード"
            className={cn(
              "w-full rounded-lg border bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow",
              errors.name ? "border-red-500" : "border-[#CBCCC9]"
            )}
          />
          {errors.name && (
            <p role="alert" className="text-red-500 text-xs">{errors.name}</p>
          )}
        </div>

        {/* プロジェクト概要 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            プロジェクト概要 <span className="text-[#FF8400]">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="プロジェクトの目的・概要を入力してください..."
            rows={5}
            className={cn(
              "w-full rounded-lg border bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none focus:ring-2 focus:ring-[#FF8400] resize-none transition-shadow",
              errors.description ? "border-red-500" : "border-[#CBCCC9]"
            )}
          />
          {errors.description && (
            <p role="alert" className="text-red-500 text-xs">{errors.description}</p>
          )}
        </div>

        {/* 開発フェーズ構成 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            開発フェーズ構成
          </label>
          <div className="flex flex-col gap-3">
            {PHASE_OPTIONS.map((opt) => {
              const isSelected = form.phase === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, phase: opt.value })}
                  className={cn(
                    "flex flex-col gap-1.5 rounded-lg border px-4 py-3.5 text-left transition-colors",
                    isSelected
                      ? "border-[#FF8400] bg-[#ff840010]"
                      : "border-[#CBCCC9] bg-[#F2F3F0]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full shrink-0",
                        isSelected
                          ? "border-4 border-[#FF8400]"
                          : "border-2 border-[#CBCCC9] bg-[#F2F3F0]"
                      )}
                    />
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold text-[#111111]">
                      {opt.label}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs ml-6">
                    {opt.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 目標リリース日 */}
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm font-medium">
            目標リリース日
          </label>
          <input
            type="date"
            value={form.targetReleaseDate}
            onChange={(e) => setForm({ ...form, targetReleaseDate: e.target.value })}
            className="w-full rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#FF8400] transition-shadow"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-3 px-10 py-5 bg-[#F2F3F0] border-t border-[#CBCCC9] shrink-0">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-xs">
          ステップ 1 / 5
        </span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 rounded-lg bg-[#FF8400] px-6 py-3 text-sm font-semibold text-[#111111] hover:bg-[#e67700] transition-colors"
        >
          次へ：機能・要件選択
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
