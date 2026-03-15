export type TaskPriority = "P0" | "P1" | "P2";
export type MilestoneStatus = "done" | "in_progress" | "pending";

export interface StatData {
  label: string;
  value: string;
  subText: string;
  valueColor?: string;
}

export interface DeadlineItem {
  id: string;
  title: string;
  priority: TaskPriority;
  dueBadge: string;
  badgeBg: string;
}

export interface MemberWorkload {
  id: string;
  name: string;
  role: string;
  initial: string;
  done: number;
  total: number;
}

export interface MilestoneItem {
  id: string;
  name: string;
  date: string;
  status: MilestoneStatus;
}

export interface PhaseProgress {
  name: string;
  percent: number;
}

// BE実装（issue #020）が完了するまでのモックデータ
export const MOCK_STATS: StatData[] = [
  {
    label: "担当タスク数",
    value: "24",
    subText: "今日: 3件  今週: 15件  超過: 2件",
  },
  {
    label: "チームメンバー",
    value: "6",
    subText: "PM×1  FE×2  BE×2  Designer×1",
  },
  {
    label: "全体進捗率",
    value: "68%",
    subText: "Phase 1 完了 → Phase 2 進行中",
    valueColor: "#FF8400",
  },
  {
    label: "学習完了タスク",
    value: "12",
    subText: "今週 +2タスク完了",
  },
];

export const MOCK_DEADLINES: DeadlineItem[] = [
  {
    id: "1",
    title: "認証機能の実装",
    priority: "P0",
    dueBadge: "今日",
    badgeBg: "#fef2f2",
  },
  {
    id: "2",
    title: "カンバンUIの作成",
    priority: "P1",
    dueBadge: "明日",
    badgeBg: "#fff7ed",
  },
  {
    id: "3",
    title: "APIエンドポイント設計",
    priority: "P2",
    dueBadge: "3日後",
    badgeBg: "#f4f4f5",
  },
];

export const MOCK_MEMBER_WORKLOAD: MemberWorkload[] = [
  { id: "1", name: "田中 太郎", role: "PM", initial: "田", done: 8, total: 10 },
  { id: "2", name: "佐藤 花子", role: "FE", initial: "佐", done: 5, total: 8 },
  { id: "3", name: "鈴木 一郎", role: "BE", initial: "鈴", done: 6, total: 9 },
];

export type TodoStatus = "pending" | "in_progress" | "done";

export interface TodoItem {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TodoStatus;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
}

// BE実装（issue #020）が完了するまでのモックデータ
export const MOCK_TODOS: TodoItem[] = [
  { id: "1", title: "認証機能の実装", priority: "P0", status: "pending" },
  { id: "2", title: "カンバンUIデザイン確認", priority: "P1", status: "done" },
  { id: "3", title: "APIエンドポイント設計", priority: "P1", status: "in_progress" },
  { id: "4", title: "テスト仕様書の作成", priority: "P2", status: "pending" },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "1",
    title: "Phase 1 開始のお知らせ",
    date: "3/15",
    content: "今週からPhase 1の開発を開始します",
  },
  {
    id: "2",
    title: "週次MTG日程変更",
    date: "3/12",
    content: "今週の定例は木曜に変更です",
  },
  {
    id: "3",
    title: "新メンバー参加",
    date: "3/10",
    content: "山田さんがチームに参加しました",
  },
];
