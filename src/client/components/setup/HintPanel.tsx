// Server Component
import { Lightbulb } from "lucide-react";

interface Hint {
  title: string;
  body: string;
}

interface HintPanelProps {
  hints: Hint[];
}

export function HintPanel({ hints }: HintPanelProps) {
  return (
    <aside className="flex flex-col gap-6 w-[360px] shrink-0 bg-white border-l border-[#CBCCC9] px-7 py-8 overflow-y-auto">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-[18px] h-[18px] text-[#FF8400] shrink-0" />
        <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-sm font-semibold">
          入力のヒント
        </span>
      </div>

      {hints.map((hint, i) => (
        <div key={i} className="flex flex-col gap-1.5 rounded-lg bg-[#F2F3F0] px-3.5 py-3">
          <p className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xs font-semibold">
            {hint.title}
          </p>
          <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-xs leading-relaxed">
            {hint.body}
          </p>
        </div>
      ))}
    </aside>
  );
}
