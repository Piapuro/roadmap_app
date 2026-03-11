import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "メールを確認してください | Roadmap AI",
};

export default function CheckEmailPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-background px-8">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-[26px] font-bold leading-[1.2]">
            確認メールを送信しました
          </h1>
          <p className="text-sm text-muted-foreground leading-[1.7]">
            ご登録のメールアドレスに確認リンクを送信しました。
            <br />
            メール内のリンクをクリックして登録を完了してください。
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          メールが届かない場合は迷惑メールフォルダをご確認ください。
        </p>

        <Link
          href="/login"
          className="text-sm text-primary font-semibold hover:underline"
        >
          ログイン画面へ戻る
        </Link>
      </div>
    </div>
  );
}
