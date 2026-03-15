import { Compass, FolderOpen, MonitorSmartphone, ListChecks, Layers, Users, MessageSquare, CheckCircle2 } from 'lucide-react'
import { cn } from '@/client/lib/cn'
import { REQ_WIZARD_STEPS } from '@/types/requirements'

const STEP_ICONS = [FolderOpen, MonitorSmartphone, ListChecks, Layers, Users, MessageSquare, CheckCircle2]

interface ReqWizardSidebarProps {
  currentStep: number
}

export function ReqWizardSidebar({ currentStep }: ReqWizardSidebarProps) {
  return (
    <aside
      className="flex flex-col w-[280px] min-h-screen bg-[#18181b] shrink-0 border-r border-white/10"
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
          要件定義
        </p>

        {REQ_WIZARD_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index]
          const isActive = step.id === currentStep
          const isDone = step.id < currentStep

          return (
            <div
              key={step.id}
              className={cn(
                'flex items-center gap-4 rounded-full px-4 py-3',
                isActive && 'bg-[#2a2a30]'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6 shrink-0',
                  isDone ? 'text-[#FF8400]' : 'text-[#fafafa]'
                )}
              />
              <span
                className={cn(
                  'font-[family-name:var(--font-geist-sans)] text-base',
                  isDone ? 'text-[#FF8400]' : 'text-[#fafafa]'
                )}
              >
                {step.sidebarLabel}
              </span>
              {isDone && (
                <CheckCircle2 className="w-4 h-4 text-[#FF8400] ml-auto shrink-0" />
              )}
            </div>
          )
        })}
      </nav>

      {/* User Footer */}
      <div className="flex items-center gap-2 px-8 py-6">
        <div className="flex flex-col flex-1 min-w-0">
          <span className="font-[family-name:var(--font-geist-sans)] text-[#fafafa] text-base truncate">
            田中 太郎
          </span>
          <span className="font-[family-name:var(--font-geist-sans)] text-[#a1a1aa] text-sm truncate">
            tanaka@example.com
          </span>
        </div>
      </div>
    </aside>
  )
}
