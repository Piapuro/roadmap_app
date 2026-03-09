"use client";

import { useEffect } from "react";
import { ErrorMessage } from "@/client/components/common/ErrorMessage";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <ErrorMessage
      code={500}
      action={
        <button
          onClick={reset}
          className="rounded-md bg-foreground px-4 py-2 text-sm text-background hover:bg-foreground/80"
        >
          再試行
        </button>
      }
    />
  );
}
