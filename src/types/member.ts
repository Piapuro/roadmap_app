export type TeamRole = "PM" | "FE" | "BE" | "UI/UX" | "Infra";
export type ProjectRole = "OWNER" | "MEMBER";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatarInitial: string;
  role: TeamRole;
  projectRole: ProjectRole;
  skills: string[];
}

export const ROLE_STYLES: Record<
  TeamRole,
  { bg: string; text: string; label: string; desc: string }
> = {
  PM: {
    bg: "bg-[#111111]",
    text: "text-[#fafafa]",
    label: "プロジェクトマネージャー",
    desc: "全権限・メンバー管理",
  },
  FE: {
    bg: "bg-[#dbeafe]",
    text: "text-[#3b82f6]",
    label: "フロントエンド",
    desc: "FEタスク・コードレビュー権限",
  },
  BE: {
    bg: "bg-[#dcfce7]",
    text: "text-[#22c55e]",
    label: "バックエンド",
    desc: "BEタスク・API設計権限",
  },
  "UI/UX": {
    bg: "bg-[#f3e8ff]",
    text: "text-[#a855f7]",
    label: "UI/UXデザイナー",
    desc: "デザイン・プロトタイプ権限",
  },
  Infra: {
    bg: "bg-[#f1f5f9]",
    text: "text-[#64748b]",
    label: "インフラ",
    desc: "インフラ・CI/CD管理権限",
  },
};

