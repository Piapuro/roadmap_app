import type { Member } from "@/types/member";

// BE実装（issue #015）が完了するまでのモックデータ
// モック上のログインユーザー: id="1"（田中 太郎）= OWNER
export const MOCK_CURRENT_USER_ID = "1";

export const MOCK_MEMBERS: Member[] = [
  {
    id: "1",
    name: "田中 太郎",
    email: "tanaka@example.com",
    avatarInitial: "田",
    role: "PM",
    projectRole: "OWNER",
    skills: ["Next.js", "TypeScript"],
  },
  {
    id: "2",
    name: "鈴木 花子",
    email: "suzuki@example.com",
    avatarInitial: "鈴",
    role: "FE",
    projectRole: "MEMBER",
    skills: ["React", "CSS"],
  },
  {
    id: "3",
    name: "木村 健一",
    email: "kimura@example.com",
    avatarInitial: "木",
    role: "BE",
    projectRole: "MEMBER",
    skills: ["Go", "PostgreSQL"],
  },
  {
    id: "4",
    name: "中村 彩",
    email: "nakamura@example.com",
    avatarInitial: "中",
    role: "UI/UX",
    projectRole: "MEMBER",
    skills: ["Figma", "Tailwind"],
  },
];
