"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Search, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/client/lib/cn";
import type { FeatureItem } from "@/types/setup";

interface FeatureCategory {
  id: string;
  label: string;
  items: FeatureItem[];
}

const INITIAL_CATEGORIES: FeatureCategory[] = [
  {
    id: "auth",
    label: "認証・ログイン",
    items: [
      {
        id: "email-auth",
        title: "メール・パスワード認証",
        description: "ログイン・新規登録・パスワードリセット",
        phase: "P0",
        checked: true,
      },
      {
        id: "google-auth",
        title: "Google OAuth 連携",
        description: "Googleアカウントでのワンクリックログイン",
        phase: "P1",
        checked: true,
      },
      {
        id: "rbac",
        title: "ロールベースアクセス制御（RBAC）",
        description: "PM / FE / BE / UX / Infra のロール管理",
        phase: "P1",
        checked: false,
      },
    ],
  },
  {
    id: "team",
    label: "チーム管理",
    items: [
      {
        id: "team-create",
        title: "チーム作成・メンバー招待",
        description: "招待リンク発行・メール招待",
        phase: "P0",
        checked: true,
      },
      {
        id: "skillmap",
        title: "スキルマップ管理",
        description: "メンバーのスキルセット・経験レベル管理",
        phase: "P2",
        checked: false,
      },
    ],
  },
];

const PHASE_COLORS: Record<string, string> = {
  P0: "bg-[#111111] text-[#F2F3F0]",
  P1: "bg-[#CBCCC9] text-[#111111]",
  P2: "bg-[#CBCCC9] text-[#111111]",
};

export function FeaturesForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<FeatureCategory[]>(INITIAL_CATEGORIES);
  const [search, setSearch] = useState("");

  const allItems = categories.flatMap((c) => c.items);
  const checkedCount = allItems.filter((i) => i.checked).length;
  const totalCount = allItems.length;
  const selectedItems = allItems.filter((i) => i.checked);

  function toggleItem(categoryId: string, itemId: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              items: cat.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : cat
      )
    );
  }

  function handleNext() {
    localStorage.setItem(
      "setup_features",
      JSON.stringify(selectedItems.map((i) => i.id))
    );
    router.push("/setup/team");
  }

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          !search ||
          item.title.includes(search) ||
          item.description.includes(search)
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex flex-1 min-h-0">
        {/* Left: Feature list */}
        <div className="flex-1 flex flex-col gap-5 p-8 overflow-y-auto bg-[#F2F3F0]">
          {/* Search + badge */}
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 rounded-full border border-[#CBCCC9] bg-[#F2F3F0] px-4 py-2.5">
              <Search className="w-4 h-4 text-[#666666] shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="機能を検索..."
                className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none"
              />
            </div>
            {checkedCount > 0 && (
              <div className="rounded-full bg-[#FF8400] px-3 py-1.5 text-xs font-semibold text-[#111111]">
                {checkedCount} 選択中
              </div>
            )}
          </div>

          {/* Category list */}
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 py-2">
                <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
                  {cat.label}
                </span>
              </div>
              <div className="rounded-lg border border-[#CBCCC9] overflow-hidden">
                {cat.items.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(cat.id, item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                      idx > 0 && "border-t border-[#CBCCC9]",
                      item.checked ? "bg-[#F2F3F0]" : "bg-white"
                    )}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        "w-[18px] h-[18px] rounded flex items-center justify-center shrink-0",
                        item.checked
                          ? "bg-[#FF8400] border border-[#FF8400]"
                          : "border border-[#CBCCC9]"
                      )}
                    >
                      {item.checked && (
                        <Check className="w-3 h-3 text-[#111111]" strokeWidth={3} />
                      )}
                    </div>

                    {/* Labels */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span
                        className={cn(
                          "font-[family-name:var(--font-geist-sans)] text-sm font-medium",
                          item.checked ? "text-[#111111]" : "text-[#666666]"
                        )}
                      >
                        {item.title}
                      </span>
                      <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
                        {item.description}
                      </span>
                    </div>

                    {/* Phase badge */}
                    <span
                      className={cn(
                        "shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold",
                        PHASE_COLORS[item.phase] ?? "bg-[#CBCCC9] text-[#111111]"
                      )}
                    >
                      {item.phase}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Selected panel */}
        <aside className="w-[340px] shrink-0 flex flex-col bg-white border-l border-[#CBCCC9]">
          {/* Header */}
          <div className="flex flex-col gap-1 px-6 py-6 border-b border-[#CBCCC9] shrink-0">
            <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-bold">
              選択済み機能
            </h3>
            <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
              {checkedCount} / {totalCount} 機能を選択中
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-[#CBCCC9] overflow-hidden">
              <div
                className="h-full bg-[#FF8400] rounded-full transition-all"
                style={{ width: `${(checkedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>

          {/* Selected list */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#CBCCC9]">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex items-center gap-2 px-5 py-2.5">
                <Check className="w-4 h-4 text-[#FF8400] shrink-0" />
                <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-sm flex-1 min-w-0 truncate">
                  {item.title}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded px-1.5 py-0.5 text-xs font-semibold",
                    PHASE_COLORS[item.phase] ?? "bg-[#CBCCC9] text-[#111111]"
                  )}
                >
                  {item.phase}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="flex items-center gap-3 px-10 py-5 bg-[#F2F3F0] border-t border-[#CBCCC9] shrink-0">
        <button
          type="button"
          onClick={() => router.push("/setup")}
          className="flex items-center gap-2 rounded-lg border border-[#CBCCC9] px-6 py-3 text-sm font-semibold text-[#111111] hover:bg-[#e5e6e3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          前へ
        </button>
        <div className="flex-1" />
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-xs">
          ステップ 2 / 5
        </span>
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 rounded-lg bg-[#FF8400] px-6 py-3 text-sm font-semibold text-[#111111] hover:bg-[#e67700] transition-colors"
        >
          次へ：チーム設定
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
