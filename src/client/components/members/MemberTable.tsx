"use client";

import { useState } from "react";
import type { Member } from "@/types/member";
import { MOCK_CURRENT_USER_ID } from "@/types/member";
import { MemberRow } from "./MemberRow";

interface MemberTableProps {
  members: Member[];
}

export function MemberTable({ members: initialMembers }: MemberTableProps) {
  const [members, setMembers] = useState(initialMembers);

  const currentUser = members.find((m) => m.id === MOCK_CURRENT_USER_ID);
  const currentUserIsOwner = currentUser?.projectRole === "OWNER";

  const handleKick = (memberId: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
  };

  const handleTransfer = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) return { ...m, projectRole: "OWNER" };
        if (m.id === MOCK_CURRENT_USER_ID) return { ...m, projectRole: "MEMBER" };
        return m;
      })
    );
  };

  const handleLeave = () => {
    setMembers((prev) => prev.filter((m) => m.id !== MOCK_CURRENT_USER_ID));
  };

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
<span className="font-[family-name:var(--font-jetbrains-mono)] text-[#666666] text-[11px] font-semibold w-[80px] text-center">
          操作
        </span>
      </div>

      {/* Rows */}
      {members.map((member) => (
        <MemberRow
          key={member.id}
          member={member}
          currentUserId={MOCK_CURRENT_USER_ID}
          currentUserIsOwner={currentUserIsOwner}
          onKick={handleKick}
          onTransfer={handleTransfer}
          onLeave={handleLeave}
        />
      ))}
    </div>
  );
}
