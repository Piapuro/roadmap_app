# コードレビューレポート

**レビュー日時**: 2026-03-11
**対象**:
- `src/client/lib/supabase.ts`
- `src/server/lib/supabase-server.ts`
- `src/proxy.ts`
- `src/app/(auth)/auth/callback/route.ts`
- `src/client/components/auth/LoginForm.tsx`
- `src/client/components/auth/RegisterForm.tsx`

**レビュアー**: Claude Code (code-review skill)

---

## 📊 サマリー

| 重要度 | 件数 |
|--------|------|
| 🔴 Critical   | 1 |
| 🟠 Major      | 2 |
| 🟡 Minor      | 2 |
| 🟢 Good       | 4 |
| 🔵 Suggestion | 2 |

**総合評価**: Good（Criticalが1件あるため要対応）

---

## 🔴 Critical Issues

### [C-1] `next` パラメータ未検証によるオープンリダイレクト

**ファイル**: `src/app/(auth)/auth/callback/route.ts:7,13`
**問題**: クエリパラメータ `next` をバリデーションなしにリダイレクトURLとして使用している。

```ts
// ❌ 現在のコード
const next = searchParams.get("next") ?? "/dashboard";
// ...
return NextResponse.redirect(`${origin}${next}`);
```

`next` に `//evil.com` や `%2F%2Fevil.com` を渡されると、ブラウザがそれを外部URLと解釈してリダイレクトする可能性がある（オープンリダイレクト脆弱性）。

```ts
// ✅ 修正案：/始まりの相対パスのみ許可
const rawNext = searchParams.get("next") ?? "/dashboard";
// 先頭が / で始まり、// でない相対パスのみ許可
const next = rawNext.startsWith("/") && !rawNext.startsWith("//")
  ? rawNext
  : "/dashboard";
```

**理由**: フィッシング攻撃の踏み台になりうる。攻撃者が `?next=//evil.com` を含むURLをユーザーに踏ませると、認証後に外部サイトへリダイレクトされる。

---

## 🟠 Major Issues

### [M-1] メール確認有効時に未認証状態でダッシュボードへ飛ぶ

**ファイル**: `src/client/components/auth/RegisterForm.tsx:72-84`
**問題**: Supabaseのメール確認が有効な場合、`signUp` は成功するが `session` が `null` のまま返る。現在のコードはこれを区別せず `/dashboard` へ遷移するため、proxyがセッションなしを検出して `/login` に戻されるループが発生する。

```ts
// ❌ 現在のコード
const { error } = await supabase.auth.signUp({ ... });
if (error) { ... }
router.push("/dashboard"); // session が null でも飛ぼうとする
```

```ts
// ✅ 修正案：session の有無で分岐
const { data, error } = await supabase.auth.signUp({ ... });
if (error) {
  setErrors({ general: error.message });
  setIsPending(false);
  return;
}
if (data.session) {
  // メール確認なし or 即時確認済み → ダッシュボードへ
  router.refresh();
  router.push("/dashboard");
} else {
  // メール確認あり → 案内画面へ（または同ページにメッセージ表示）
  router.push("/register/check-email");
}
```

**理由**: Supabaseダッシュボードのメール確認設定によって動作が変わるため、両ケースに対応が必要。

---

### [M-2] ログイン後に `router.refresh()` がない

**ファイル**: `src/client/components/auth/LoginForm.tsx:60`, `src/client/components/auth/RegisterForm.tsx:84`
**問題**: `signInWithPassword` / `signUp` 成功後に `router.refresh()` を呼んでいない。Next.jsのServer Componentキャッシュが認証前の状態のまま残り、`/dashboard` でのデータ取得が未ログイン状態のレスポンスを返す場合がある。

```ts
// ❌ 現在のコード（LoginForm）
router.push("/dashboard");
```

```ts
// ✅ 修正案
router.refresh();       // Serverコンポーネントのキャッシュをクリア
router.push("/dashboard");
```

**理由**: Supabase公式ドキュメントでも `router.refresh()` の呼び出しが推奨されている。

---

## 🟡 Minor Issues

### [m-1] Supabaseのエラーメッセージが英語のまま表示される

**ファイル**: `src/client/components/auth/RegisterForm.tsx:80`
**問題**: `error.message` をそのまま表示しているが、Supabaseのエラーは英語で返ってくる（例: `"User already registered"`）。

```ts
// ❌ 現在のコード
setErrors({ general: error.message });
```

```ts
// ✅ 修正案：代表的なエラーを日本語にマッピング
function toJaMessage(msg: string): string {
  if (msg.includes("already registered")) return "このメールアドレスはすでに登録されています";
  if (msg.includes("Password should be")) return "パスワードは6文字以上で入力してください";
  if (msg.includes("rate limit")) return "しばらく時間をおいてから再試行してください";
  return "登録に失敗しました。時間をおいて再試行してください";
}
// ...
setErrors({ general: toJaMessage(error.message) });
```

---

### [m-2] 環境変数 `!` non-null assertion に実行時チェックなし

**ファイル**: `src/client/lib/supabase.ts:5-6`, `src/server/lib/supabase-server.ts:9-10`
**問題**: 環境変数が未設定のまま本番デプロイされた場合、ランタイムエラーになるがエラーメッセージが分かりにくい。

```ts
// ❌ 現在のコード（沈黙する問題）
process.env.NEXT_PUBLIC_SUPABASE_URL!
```

```ts
// ✅ 修正案：開発時に早期エラーで気づける
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase環境変数が設定されていません。.env.localを確認してください。");
}
```

---

## 🟢 Good Points

### [G-1] ログインエラーメッセージが汎用的
**ファイル**: `src/client/components/auth/LoginForm.tsx:56`
Supabase の実際のエラー（「メールが存在しない」「パスワードが違う」）を区別せず「メールアドレスまたはパスワードが正しくありません」と返している。ユーザー列挙攻撃（User Enumeration）を防ぐ正しいセキュリティ実装。

### [G-2] `getUser()` を使用してセッション検証
**ファイル**: `src/proxy.ts:31`
`getSession()` ではなく `getUser()` を使用している。`getSession()` はローカルのCookieを信頼するだけだが、`getUser()` はSupabaseサーバーへ問い合わせて検証するためより安全。Supabase公式推奨のパターンに準拠している。

### [G-3] `server-only` import でクライアント漏洩を防止
**ファイル**: `src/server/lib/supabase-server.ts:1`
`import "server-only"` によって、このファイルがクライアントバンドルに混入した場合にビルドエラーになる。意図しない秘密情報の漏洩を防ぐ良い設計。

### [G-4] クライアント・サーバーのSupabaseクライアントを明確に分離
`src/client/lib/supabase.ts`（Browser）と `src/server/lib/supabase-server.ts`（Server）を分けており、プロジェクトの `client/` / `server/` 分離ルールに準拠している。

---

## 🔵 Suggestions

### [S-1] proxy.ts の保護対象パスを将来に備えて拡張しやすくする

**ファイル**: `src/proxy.ts:34`
現在 `/dashboard` のみを認証必須としているが、今後 `/teams/*` なども対象になる。

```ts
// 💡 保護対象パスを配列で管理すると追加しやすい
const PROTECTED_PATHS = ["/dashboard", "/teams", "/setup"];

const isProtected = PROTECTED_PATHS.some((path) =>
  request.nextUrl.pathname.startsWith(path)
);
if (!user && isProtected) {
  return NextResponse.redirect(new URL("/login", request.url));
}
```

---

### [S-2] 登録後のメール確認案内ページを追加する

**ファイル**: `src/client/components/auth/RegisterForm.tsx`
[M-1] の対応として、`src/app/(auth)/register/check-email/page.tsx` を作成し「確認メールを送信しました。メールのリンクをクリックしてください」というシンプルなページを置くとUXが向上する。

---

## アクションアイテム

- [ ] [C-1] `route.ts` の `next` パラメータをバリデーション — **必須・今すぐ**
- [ ] [M-1] `RegisterForm` でメール確認フローに対応 — **必須・今週中**
- [ ] [M-2] ログイン・登録後に `router.refresh()` を追加 — **必須・今週中**
- [ ] [m-1] Supabaseエラーメッセージを日本語マッピング — 改善推奨
- [ ] [m-2] 環境変数の実行時チェックを追加 — 改善推奨
- [ ] [S-1] proxy の保護対象パスを配列管理に変更 — 任意
- [ ] [S-2] メール確認案内ページの追加 — 任意

---
*Generated by Claude Code / code-review skill*
