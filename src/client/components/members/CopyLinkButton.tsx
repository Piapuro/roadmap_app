"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CopyLinkButtonProps {
  text: string;
}

export function CopyLinkButton({ text }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 bg-[#FF8400] px-3.5 h-9 shrink-0 justify-center"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[#111111]" strokeWidth={3} />
      ) : (
        <Copy className="w-3.5 h-3.5 text-[#111111]" />
      )}
      <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xs font-semibold">
        {copied ? "コピー済" : "コピー"}
      </span>
    </button>
  );
}
