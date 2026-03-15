import { Pencil } from "lucide-react";
import { cn } from "@/client/lib/cn";
import type { Member } from "@/types/member";
import { ROLE_STYLES, STATUS_STYLES } from "@/types/member";

interface MemberRowProps {
  member: Member;
}

export function MemberRow({ member }: MemberRowProps) {
  const role = ROLE_STYLES[member.role];
  const status = STATUS_STYLES[member.status];

  return (
    <div className="flex items-center px-4 py-3.5 border-t border-[#CBCCC9] bg-white">
      {/* Avatar + Name */}
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[#F2F3F0] border border-[#CBCCC9] flex items-center justify-center shrink-0">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-xs font-medium">
            {member.avatarInitial}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 pl-1">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#111111] text-[13px] font-medium truncate">
            {member.name}
          </span>
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

      {/* Status */}
      <div className="w-[100px] shrink-0 flex items-center gap-1.5">
        <div className={cn("w-[7px] h-[7px] rounded-full shrink-0", status.dot)} />
        <span
          className={cn(
            "font-[family-name:var(--font-geist-sans)] text-xs",
            status.textColor
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Action */}
      <div className="w-[80px] shrink-0 flex items-center justify-center">
        <button
          type="button"
          aria-label={`${member.name}を編集`}
          className="p-1 rounded hover:bg-[#F2F3F0] transition-colors"
        >
          <Pencil className="w-4 h-4 text-[#666666]" />
        </button>
      </div>
    </div>
  );
}
