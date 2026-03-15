"use client";

import { useState } from "react";
import { Crown, MoreHorizontal, LogOut, UserMinus, ShieldCheck } from "lucide-react";
import { cn } from "@/client/lib/cn";
import type { Member } from "@/types/member";
import { ROLE_STYLES } from "@/types/member";
import { ConfirmDialog } from "./ConfirmDialog";

type DialogType = "kick" | "transfer" | "leave" | null;

interface MemberRowProps {
  member: Member;
  currentUserId: string;
  currentUserIsOwner: boolean;
  onKick: (memberId: string) => void;
  onTransfer: (memberId: string) => void;
  onLeave: () => void;
}

export function MemberRow({
  member,
  currentUserId,
  currentUserIsOwner,
  onKick,
  onTransfer,
  onLeave,
}: MemberRowProps) {
  const role = ROLE_STYLES[member.role];
  const isMe = member.id === currentUserId;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<DialogType>(null);

  const handleConfirm = async () => {
    try {
      if (dialog === "kick" && member.projectRole === "MEMBER") await onKick(member.id);
      else if (dialog === "transfer" && member.projectRole === "MEMBER") await onTransfer(member.id);
      else if (dialog === "leave") await onLeave();
      setDialog(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center px-4 py-3.5 border-t border-[#CBCCC9] bg-white">
        {/* Avatar + Name */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#F2F3F0] border border-[#CBCCC9] flex items-center justify-center">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-xs font-medium">
                {member.avatarInitial}
              </span>
            </div>
            {member.projectRole === "OWNER" && (
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF8400] flex items-center justify-center">
                <Crown className="w-2.5 h-2.5 text-white" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5 min-w-0 pl-1">
            <div className="flex items-center gap-1.5">
              <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[13px] font-medium truncate">
                {member.name}
              </span>
              {isMe && (
                <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px] shrink-0">
                  （自分）
                </span>
              )}
            </div>
            <span className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[11px] truncate">
              {member.email}
            </span>
          </div>
        </div>

        {/* Role */}
        <div className="w-[130px] shrink-0">
          <span
            className={cn(
              "inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold font-[family-name:var(--font-jetbrains-mono)]",
              role.bg,
              role.text
            )}
          >
            {member.role}
          </span>
        </div>

        {/* Skills */}
        <div className="w-[200px] shrink-0 flex items-center gap-1.5 flex-wrap">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium font-[family-name:var(--font-geist-sans)] bg-[#F2F3F0] text-[#111111] border border-[#CBCCC9]"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action */}
        <div className="w-[80px] shrink-0 flex items-center justify-center">
          {/* OWNERが他MEMBERを操作 */}
          {currentUserIsOwner && !isMe && member.projectRole === "MEMBER" && (
            <div className="relative">
              <button
                type="button"
                aria-label={`${member.name}の操作メニュー`}
                onClick={() => setMenuOpen((v) => !v)}
                className="p-1 rounded hover:bg-[#F2F3F0] transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-[#666666]" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-7 z-20 w-[176px] rounded-lg border border-[#CBCCC9] bg-white shadow-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => { setMenuOpen(false); setDialog("transfer"); }}
                      className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[13px] text-[#111111] hover:bg-[#F2F3F0] transition-colors font-[family-name:var(--font-geist-sans)]"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#FF8400] shrink-0" />
                      オーナーを譲渡
                    </button>
                    <div className="h-px bg-[#CBCCC9]" />
                    <button
                      type="button"
                      onClick={() => { setMenuOpen(false); setDialog("kick"); }}
                      className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[13px] text-[#ef4444] hover:bg-[#fef2f2] transition-colors font-[family-name:var(--font-geist-sans)]"
                    >
                      <UserMinus className="w-4 h-4 shrink-0" />
                      キックする
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* 自分がMEMBERのとき: 脱退ボタン */}
          {isMe && !currentUserIsOwner && (
            <button
              type="button"
              onClick={() => setDialog("leave")}
              aria-label="チームを脱退する"
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-[#ef4444] hover:bg-[#fef2f2] transition-colors font-[family-name:var(--font-geist-sans)]"
            >
              <LogOut className="w-3.5 h-3.5 shrink-0" />
              脱退
            </button>
          )}

          {/* 自分がOWNERのとき: 操作なし（先に譲渡が必要） */}
          {isMe && currentUserIsOwner && (
            <span className="text-[11px] text-[#CBCCC9] font-[family-name:var(--font-geist-sans)] select-none">
              —
            </span>
          )}
        </div>
      </div>

      {/* Dialogs */}
      {dialog === "kick" && (
        <ConfirmDialog
          title={`${member.name}をキックしますか？`}
          description={`${member.name}をチームから除外します。この操作は取り消せません。担当タスクは未アサイン状態になります。`}
          confirmLabel="キックする"
          confirmClassName="bg-[#ef4444] text-white hover:bg-[#dc2626]"
          onConfirm={handleConfirm}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === "transfer" && (
        <ConfirmDialog
          title={`${member.name}にオーナーを譲渡しますか？`}
          description={`オーナー権限が${member.name}に移ります。あなたはMEMBERになります。この操作は取り消せません。`}
          confirmLabel="譲渡する"
          confirmClassName="bg-[#FF8400] text-white hover:bg-[#e67700]"
          onConfirm={handleConfirm}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog === "leave" && (
        <ConfirmDialog
          title="チームを脱退しますか？"
          description="チームから脱退します。担当タスクは未アサイン状態になります。再参加するには招待が必要です。"
          confirmLabel="脱退する"
          confirmClassName="bg-[#ef4444] text-white hover:bg-[#dc2626]"
          onConfirm={handleConfirm}
          onCancel={() => setDialog(null)}
        />
      )}
    </>
  );
}
