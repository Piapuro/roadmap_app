"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/client/lib/cn";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function LoginForm() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);

  function validate(): FormErrors {
    const next: FormErrors = {};
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
    // TODO: Supabase auth integration (issue #4)
    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
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
            ログインに失敗しました
          </p>
          <p
            className="text-sm"
            style={{ color: "var(--color-error-foreground)" }}
          >
            {errors.general}
          </p>
        </div>
      )}

      {/* Form fields */}
      <div className="flex flex-col gap-3.5">
        <Field
          id="email"
          label="メールアドレス"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          onChange={(v) => setForm((f) => ({ ...f, email: v }))}
        />
        <div className="flex flex-col gap-1">
          <Field
            id="password"
            label="パスワード"
            type="password"
            placeholder="8文字以上・英数混在"
            value={form.password}
            error={errors.password}
            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[13px] text-primary hover:underline"
            >
              パスワードを忘れた方
            </Link>
          </div>
        </div>
      </div>

      {/* Primary button */}
      <button
        type="submit"
        disabled={isPending}
        className="h-12 w-full rounded-full bg-primary text-primary-foreground font-heading text-sm font-bold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isPending ? "ログイン中..." : "ログイン"}
      </button>

      {/* Divider */}
      <Divider />

      {/* Google login (issue #5) */}
      <button
        type="button"
        disabled
        className="h-12 w-full rounded-full border border-border bg-card text-foreground text-sm font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <GoogleIcon />
        Googleでログイン
      </button>

      {/* Register link */}
      <p className="text-center text-[13px] text-muted-foreground">
        アカウントをお持ちでない方は{" "}
        <Link href="/register" className="text-primary font-semibold hover:underline">
          新規登録
        </Link>
      </p>
    </form>
  );
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

function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[13px] text-muted-foreground">または</span>
      <div className="h-px flex-1 bg-border" />
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
