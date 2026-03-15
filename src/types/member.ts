export type TeamRole = "PM" | "FE" | "BE" | "UI/UX" | "Infra";
export type MemberStatus = "online" | "away" | "offline";

export interface Member {
  id: string;
  name: string;
  email: string;
  avatarInitial: string;
  role: TeamRole;
  skills: string[];
  status: MemberStatus;
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

export const STATUS_STYLES: Record<
  MemberStatus,
  { dot: string; label: string; textColor: string }
> = {
  online: { dot: "bg-green-500", label: "オンライン", textColor: "text-[#111111]" },
  away: { dot: "bg-amber-400", label: "離席中", textColor: "text-[#666666]" },
  offline: { dot: "bg-gray-400", label: "オフライン", textColor: "text-[#666666]" },
};

// BE実装（issue #015）が完了するまでのモックデータ
export const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "田中 太郎",
    email: "tanaka@example.com",
    avatarInitial: "田",
    role: "PM",
    skills: ["Next.js", "TypeScript"],
    status: "online",
  },
  {
    id: "2",
    name: "鈴木 花子",
    email: "suzuki@example.com",
    avatarInitial: "鈴",
    role: "FE",
    skills: ["React", "CSS"],
    status: "online",
  },
  {
    id: "3",
    name: "木村 健一",
    email: "kimura@example.com",
    avatarInitial: "木",
    role: "BE",
    skills: ["Go", "PostgreSQL"],
    status: "away",
  },
  {
    id: "4",
    name: "中村 彩",
    email: "nakamura@example.com",
    avatarInitial: "中",
    role: "UI/UX",
    skills: ["Figma", "Tailwind"],
    status: "online",
  },
];
