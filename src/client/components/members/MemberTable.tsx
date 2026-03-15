// Server Component
import type { Member } from "@/types/member";
import { MemberRow } from "./MemberRow";

interface MemberTableProps {
  members: Member[];
}

export function MemberTable({ members }: MemberTableProps) {
  if (members.length === 0) {
    return (
      <div className="rounded-lg border border-[#CBCCC9] bg-white flex items-center justify-center py-16">
        <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-sm">
          メンバーが見つかりませんでした
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#CBCCC9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center bg-[#F2F3F0] px-4 py-2.5">
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-[11px] font-semibold flex-1">
          メンバー
        </span>
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-[11px] font-semibold w-[130px]">
          ロール
        </span>
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-[11px] font-semibold w-[200px]">
          スキル
        </span>
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-[11px] font-semibold w-[100px]">
          ステータス
        </span>
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-[11px] font-semibold w-[80px] text-center">
          操作
        </span>
      </div>

      {/* Rows */}
      {members.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  );
}
