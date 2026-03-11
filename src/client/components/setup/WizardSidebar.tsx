// Server Component
import {
  Compass,
  FolderOpen,
  ClipboardList,
  Users,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/client/lib/cn";
import { WIZARD_STEPS } from "@/types/setup";

const STEP_ICONS = [FolderOpen, ClipboardList, Users, Layers, CheckCircle2];

interface WizardSidebarProps {
  currentStep: number;
}

export function WizardSidebar({ currentStep }: WizardSidebarProps) {
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
          セットアップ
        </p>

        {WIZARD_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index];
          const isActive = step.id === currentStep;

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-4 rounded-full px-4 py-3",
                isActive && "bg-[#2a2a30]"
              )}
            >
              <Icon className="w-6 h-6 text-[#fafafa] shrink-0" />
              <span className="font-[family-name:var(--font-geist-sans)] text-[#fafafa] text-base">
                {step.sidebarLabel}
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
          <span className="font-[family-name:var(--font-geist-sans)] text-[#fafafa] text-base truncate">
            tanaka@example.com
          </span>
        </div>
      </div>
    </aside>
  );
}
