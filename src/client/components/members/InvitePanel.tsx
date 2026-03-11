// Server Component
import { RefreshCw } from "lucide-react";
import { CopyLinkButton } from "./CopyLinkButton";
import { ROLE_STYLES } from "@/types/member";
import type { TeamRole } from "@/types/member";

const INVITE_LINK = "https://roadmap.ai/invite/abc123";

const ROLE_PANEL_ICONS: { role: TeamRole; iconBg: string; iconText: string }[] = [
  { role: "PM",    iconBg: "bg-[#FF8400]",   iconText: "text-[#111111]" },
  { role: "FE",    iconBg: "bg-[#3b82f620]", iconText: "text-[#3b82f6]" },
  { role: "BE",    iconBg: "bg-[#22c55e20]", iconText: "text-[#22c55e]" },
  { role: "UI/UX", iconBg: "bg-[#f3e8ff]",   iconText: "text-[#a855f7]" },
];

export function InvitePanel() {
  return (
    <aside className="w-[320px] shrink-0 flex flex-col bg-white border-l border-[#CBCCC9] overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col gap-1 px-6 py-5 border-b border-[#CBCCC9]">
        <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[15px] font-bold">
          招待・ロール設定
        </h2>
        <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs">
          メンバーを招待してロールを設定
        </p>
      </div>

      {/* Invite Link */}
      <div className="flex flex-col gap-3 px-6 py-5 border-b border-[#CBCCC9]">
        <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[13px] font-semibold">
          招待リンク
        </h3>
        <div className="flex items-center rounded-lg border border-[#CBCCC9] overflow-hidden">
          <div className="flex-1 px-3 py-2 h-9 flex items-center min-w-0">
            <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px] truncate">
              {INVITE_LINK}
            </span>
          </div>
          <CopyLinkButton text={INVITE_LINK} />
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#CBCCC9] px-4 py-2 text-sm font-semibold text-[#111111] hover:bg-[#F2F3F0] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold">
            リンクを再発行
          </span>
        </button>
      </div>

      {/* Role Definitions */}
      <div className="flex flex-col gap-3 px-6 py-5 border-b border-[#CBCCC9]">
        <h3 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-[13px] font-semibold">
          ロール定義
        </h3>
        {ROLE_PANEL_ICONS.map(({ role, iconBg, iconText }) => {
          const style = ROLE_STYLES[role];
          return (
            <div
              key={role}
              className="flex items-center gap-2.5 rounded-lg bg-[#F2F3F0] px-3 py-2.5"
            >
              <div
                className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${iconBg}`}
              >
                <span
                  className={`font-[family-name:var(--font-jetbrains-mono)] text-[9px] font-bold ${iconText}`}
                >
                  {role}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-xs font-medium">
                  {style.label}
                </span>
                <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px]">
                  {style.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
