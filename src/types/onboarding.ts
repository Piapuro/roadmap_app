export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface SkillTag {
  id: string;
  name: string;
  category: "frontend" | "backend" | "infra";
}

export const SKILL_LEVEL_OPTIONS = [
  { value: "beginner" as SkillLevel, label: "初心者", description: "ゼロから始める" },
  { value: "intermediate" as SkillLevel, label: "中級者", description: "基本はわかる" },
  { value: "advanced" as SkillLevel, label: "上級者", description: "しっかり経験あり" },
] as const;

export const SKILL_TAGS: SkillTag[] = [
  // Frontend
  { id: "react", name: "React", category: "frontend" },
  { id: "typescript", name: "TypeScript", category: "frontend" },
  { id: "vue", name: "Vue.js", category: "frontend" },
  { id: "nextjs", name: "Next.js", category: "frontend" },
  { id: "javascript", name: "JavaScript", category: "frontend" },
  { id: "nuxtjs", name: "Nuxt.js", category: "frontend" },
  { id: "angular", name: "Angular", category: "frontend" },
  // Backend
  { id: "nodejs", name: "Node.js", category: "backend" },
  { id: "python", name: "Python", category: "backend" },
  { id: "go", name: "Go", category: "backend" },
  { id: "java", name: "Java", category: "backend" },
  { id: "php", name: "PHP", category: "backend" },
  { id: "ruby", name: "Ruby", category: "backend" },
  { id: "rust", name: "Rust", category: "backend" },
  // Infra
  { id: "docker", name: "Docker", category: "infra" },
  { id: "aws", name: "AWS", category: "infra" },
  { id: "gcp", name: "GCP", category: "infra" },
  { id: "postgresql", name: "PostgreSQL", category: "infra" },
  { id: "mysql", name: "MySQL", category: "infra" },
  { id: "git", name: "Git", category: "infra" },
];

export const SKILL_CATEGORIES = [
  { key: "frontend" as const, label: "フロントエンド" },
  { key: "backend" as const, label: "バックエンド" },
  { key: "infra" as const, label: "インフラ / その他" },
];
