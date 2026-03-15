"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useTransition } from "react";

export function MemberSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }
      router.replace(`?${params.toString()}`);
    });
  }

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-[#CBCCC9] bg-[#F2F3F0] px-3.5 py-2 h-9"
      data-pending={isPending || undefined}
    >
      <Search className="w-4 h-4 text-[#666666] shrink-0" />
      <input
        type="text"
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleChange}
        placeholder="名前・スキルで検索..."
        className="bg-transparent text-sm text-[#111111] placeholder:text-[#CBCCC9] outline-none w-44"
      />
    </div>
  );
}
