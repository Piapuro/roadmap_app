import "server-only";
import { notFound, redirect } from "next/navigation";
import type { ApiErrorCode } from "@/types/api";

export class AppError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    message: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * API レスポンスのエラーコードに応じて Next.js のエラーハンドリングへ委譲する
 */
export function handleApiError(code: ApiErrorCode, message?: string): never {
  if (code === 404) notFound();
  if (code === 401) redirect("/login");
  throw new AppError(code, message ?? `Error ${code}`);
}
