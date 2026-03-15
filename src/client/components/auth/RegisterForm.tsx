"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/client/lib/cn";
import { createClient } from "@/client/lib/supabase";

interface FormState {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  agreeToTerms?: string;
  general?: string;
}

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!form.name) next.name = "名前を入力してください";
    if (!form.email) {
      next.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "正しいメールアドレスを入力してください";
    }
    if (!form.password) {
      next.password = "パスワードを入力してください";
    } else if (form.password.length < 8) {
      next.password = "パスワードは8文字以上で入力してください";
    }
    if (!form.passwordConfirm) {
      next.passwordConfirm = "パスワード（確認）を入力してください";
    } else if (form.password !== form.passwordConfirm) {
      next.passwordConfirm = "パスワードが一致しません";
    }
    if (!form.agreeToTerms) {
      next.agreeToTerms = "利用規約への同意が必要です";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }
    setErrors({});
    setIsPending(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { name: form.name },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
        },
      });
      if (error) {
        setErrors({ general: toJaErrorMessage(error.message) });
        return;
      }
      if (data.session) {
        router.refresh();
        router.push("/onboarding");
      } else {
        router.push("/register/check-email");
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* General error alert */}
      {errors.general && (
        <div
          className="rounded-none p-4 flex flex-col gap-1"
          style={{ backgroundColor: "var(--color-error)" }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-error-foreground)" }}
          >
            登録に失敗しました
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--color-error-foreground)" }}
          >
            {errors.general}
          </p>
        </div>
      )}

      {/* Name + Email row */}
      <div className="grid grid-cols-2 gap-3">
        <Field
          id="name"
          label="名前"
          type="text"
          placeholder="田中 太郎"
          value={form.name}
          error={errors.name}
          onChange={(v) => setForm((f) => ({ ...f, name: v }))}
        />
        <Field
          id="email"
          label="メールアドレス"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
      </div>

      {/* Password */}
      <Field
        id="password"
        label="パスワード（8文字以上）"
        type="password"
        placeholder="••••••••"
        value={form.password}
        error={errors.password}
        onChange={(v) => setForm((f) => ({ ...f, password: v }))}
      />

      {/* Password confirm */}
      <Field
        id="passwordConfirm"
        label="パスワード（確認）"
        type="password"
        placeholder="••••••••"
        value={form.passwordConfirm}
        error={errors.passwordConfirm}
        onChange={(v) => setForm((f) => ({ ...f, passwordConfirm: v }))}
      />

      {/* Terms checkbox */}
      <div className="flex flex-col gap-1">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.agreeToTerms}
            onChange={(e) =>
              setForm((f) => ({ ...f, agreeToTerms: e.target.checked }))
            }
            className="w-4 h-4 rounded-none border-foreground accent-foreground cursor-pointer"
          />
          <span className="text-[13px] text-muted-foreground">
            <Link href="/terms" className="underline hover:text-foreground">
              利用規約
            </Link>
            ・
            <Link href="/privacy" className="underline hover:text-foreground">
              プライバシーポリシー
            </Link>
            に同意する
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-xs text-destructive">{errors.agreeToTerms}</p>
        )}
      </div>

      {/* Primary button */}
      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "作成中..." : "アカウントを作成"}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-[13px] text-muted-foreground">または</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google register (issue #5) */}
      <button
        type="button"
        disabled
        className="h-12 w-full rounded-full border border-border bg-card text-foreground text-sm font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        Googleで登録
      </button>

      {/* Login link */}
      <p className="text-center text-[13px] text-muted-foreground">
        既にアカウントをお持ちの方は{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          ログイン
        </Link>
      </p>
    </form>
  );
}

/* ── Helpers ─────────────────────────────────────────────── */

function toJaErrorMessage(msg: string): string {
  if (msg.includes("already registered") || msg.includes("already been registered"))
    return "このメールアドレスはすでに登録されています";
  if (msg.includes("Password should be"))
    return "パスワードは8文字以上で入力してください";
  if (msg.includes("rate limit") || msg.includes("too many"))
    return "しばらく時間をおいてから再試行してください";
  if (msg.includes("invalid email") || msg.includes("Invalid email"))
    return "正しいメールアドレスを入力してください";
  return "登録に失敗しました。時間をおいて再試行してください";
}

/* ── Sub-components ─────────────────────────────────────── */

interface FieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
}

function Field({ id, label, type, placeholder, value, error, onChange, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-10 w-full rounded-full border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors",
          "focus:ring-2 focus:ring-primary/30 focus:border-primary",
          error ? "border-destructive" : "border-input"
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
