// Server Component
import {
  Compass,
  Home,
  SlidersHorizontal,
  Sparkles,
  Kanban,
  Users,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/client/lib/cn";

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "ダッシュボード",  icon: Home },
  { label: "要件定義",        icon: SlidersHorizontal },
  { label: "AI生成結果",      icon: Sparkles },
  { label: "ロードマップ",    icon: Kanban },
  { label: "チーム管理",      icon: Users },
  { label: "学習リソース",    icon: GraduationCap },
];

interface DashboardSidebarProps {
  activeLabel?: string;
}

export function DashboardSidebar({ activeLabel = "チーム管理" }: DashboardSidebarProps) {
  return (
    <aside
      className="flex flex-col w-[280px] min-h-screen bg-[#18181b] shrink-0"
      style={{ borderRight: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-8 h-[88px] border-b border-white/10 shrink-0">
        <Compass className="w-8 h-8 text-[#FF8400] shrink-0" />
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#FF8400] text-lg font-bold tracking-wide">
          ROADMAP AI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col flex-1 px-4 py-4 gap-1">
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[#fafafa] text-sm px-4 py-4">
          メインメニュー
        </p>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={cn(
                "flex items-center gap-4 rounded-full px-4 py-3",
                item.label === activeLabel && "bg-[#2a2a30]"
              )}
            >
              <Icon className="w-6 h-6 text-[#fafafa] shrink-0" />
              <span className="font-[family-name:var(--font-geist-sans)] text-[#fafafa] text-base">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="flex items-center gap-2 px-8 py-6">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#fafafa] text-base truncate">
            田中 太郎
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#fafafa] text-sm truncate text-white/60">
            tanaka@example.com
          </span>
        </div>
      </div>
    </aside>
  );
}
