import type { ElementType, ReactNode } from "react";
import { AlertCircle, Lock, ShieldOff, ServerCrash } from "lucide-react";
import type { ApiErrorCode } from "@/types/api";

const ERROR_CONFIG: Record<
  ApiErrorCode,
  { icon: ElementType; title: string; description: string }
> = {
  401: {
    icon: Lock,
    title: "ログインが必要です",
    description: "このページを表示するにはログインしてください。",
  },
  403: {
    icon: ShieldOff,
    title: "アクセス権限がありません",
    description: "このページへのアクセス権限がありません。",
  },
  404: {
    icon: AlertCircle,
    title: "ページが見つかりません",
    description: "お探しのページは存在しないか、削除された可能性があります。",
  },
  500: {
    icon: ServerCrash,
    title: "サーバーエラーが発生しました",
    description: "しばらく時間をおいてから再度お試しください。",
  },
};

interface ErrorMessageProps {
  code: ApiErrorCode;
  message?: string;
  action?: ReactNode;
}

export function ErrorMessage({ code, message, action }: ErrorMessageProps) {
  const config = ERROR_CONFIG[code];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="rounded-full bg-destructive/10 p-4">
        <Icon className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">エラー {code}</p>
        <h2 className="text-xl font-semibold text-foreground">{config.title}</h2>
        <p className="text-sm text-muted-foreground">{message ?? config.description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
