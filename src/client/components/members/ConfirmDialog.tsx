"use client";

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  confirmClassName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  confirmClassName = "bg-[#ef4444] text-white hover:bg-[#dc2626]",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative z-10 w-[400px] rounded-xl bg-white border border-[#CBCCC9] shadow-lg p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-base font-bold">
            {title}
          </h2>
          <p className="font-[family-name:var(--font-geist-sans)] text-[#666666] text-[13px] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#CBCCC9] bg-white px-4 py-2 text-[13px] font-semibold text-[#111111] hover:bg-[#F2F3F0] transition-colors font-[family-name:var(--font-geist-sans)]"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors font-[family-name:var(--font-geist-sans)] ${confirmClassName}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
