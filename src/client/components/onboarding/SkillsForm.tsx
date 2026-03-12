"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/client/lib/cn";
import { saveOnboardingSkills } from
        "@/server/actions/onboarding";
import {
  type SkillLevel,
  SKILL_LEVEL_OPTIONS,
  SKILL_TAGS,
  SKILL_CATEGORIES,
} from "@/types/onboarding";

export function SkillsForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("beginner");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  function toggleTag(tagId: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) {
        next.delete(tagId);
      } else {
        next.add(tagId);
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
           await saveOnboardingSkills(skillLevel,
         [...selectedTags]);

        router.push("/dashboard");
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {error && (
        <div
          className="rounded-lg p-3.5"
          style={{ backgroundColor: "var(--color-error)" }}
        >
          <p className="text-sm" style={{ color: "var(--color-error-foreground)" }}>
            {error}
          </p>
        </div>
      )}

      {/* Overall skill level */}
      <div className="flex flex-col gap-2.5">
        <span className="text-sm font-medium text-foreground">全体的なスキルレベル</span>
        <div className="grid grid-cols-3 gap-3">
          {SKILL_LEVEL_OPTIONS.map((opt) => {
            const isSelected = skillLevel === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSkillLevel(opt.value)}
                className={cn(
                  "flex flex-col gap-1 rounded-xl border-2 p-3.5 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-[#fff4e8]"
                    : "border-border bg-background hover:border-primary/40"
                )}
              >
                {isSelected && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-[11px] font-semibold text-primary">選択中</span>
                  </span>
                )}
                <span className="font-heading text-sm font-semibold text-foreground">
                  {opt.label}
                </span>
                <span className="text-xs text-muted-foreground">{opt.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tech tag categories */}
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium text-foreground">得意な技術タグ（複数選択可）</span>
        {SKILL_CATEGORIES.map((cat) => {
          const tags = SKILL_TAGS.filter((t) => t.category === cat.key);
          return (
            <div key={cat.key} className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {cat.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => {
                  const isSelected = selectedTags.has(tag.id);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={cn(
                        "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-background text-foreground hover:border-primary/50"
                      )}
                    >
                      {tag.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info note */}
      <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2.5">
        <svg
          className="h-3.5 w-3.5 shrink-0 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-xs text-blue-700">選択したタグに経験年数を後から設定できます</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          スキップ
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="h-10 rounded-full bg-primary px-6 font-heading text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "保存中..." : "登録して始める"}
        </button>
      </div>
    </form>
  );
}
