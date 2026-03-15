# デザイン仕様 変更履歴・注意点

> `roadmap.pen` の最新デザインをもとにまとめた FE 実装上の注意点。
> 実装前に必ずこのドキュメントを確認すること。

---

## 1. 認証・オンボーディング画面 — 左パネル幅統一

**対象画面**: A1（ログイン）/ A2（新規登録）/ O1（オンボーディング スキル登録）

| 画面 | .pen ノード ID | 左パネル幅 | テキスト有効幅 |
|------|--------------|-----------|-------------|
| A1 - Login | `6Hes1` > `KmjPs` | **640px** | ~480px（padding 64px × 2） |
| A2 - Register | `dXIpB` > `LfYIJ` | **640px** | ~480px（padding 64px × 2） |
| O1 - Onboarding Skills | `FVq4l` > `rs6un` | **640px** | ~480px（padding 64px × 2） |

### 実装上の注意
- Tailwind では `w-[640px]` を使用
- 旧実装（`w-[480px]`）が残っている場合は修正すること
- テキストブロックは内側に `max-w-[480px]` を当てる
- 右パネルは `flex-1`（残り幅を全て使用）

```tsx
// 左パネル
<div className="hidden lg:flex w-[640px] bg-primary ...">
  <div className="w-full max-w-[480px] mx-auto ...">
    {/* コンテンツ */}
  </div>
</div>
```

---

## 2. W3（チーム設定）/ M1（招待モーダル）— 検索欄の仕様変更

**対象画面**: W3 - Wizard Step3 Team / M1 - Invite Modal

### 変更内容
- **検索欄は1つのみ**（名前・メールアドレスの OR 検索）
- **役割（ロール）セレクタは廃止** — メンバー追加時に役割を選択するドロップダウンは不要
- 検索欄はメンバー追加エリア（addBox）の先頭に1つだけ配置する

### 旧仕様（廃止）
```
[名前で検索 input] [役割 select ▼] [追加ボタン]
```

### 新仕様
```
[名前またはメールアドレスで検索 input（OR検索）]
[追加ボタン]
```

### 実装例
```tsx
// W3 / M1 共通パターン
<input
  type="search"
  placeholder="名前またはメールアドレスで検索"
  // 単一フィールド、name と email に対して OR 検索
/>
// 役割セレクタは不要
```

---

## 3. W4（技術スタック選択）— 検索フィールドの位置

**対象画面**: W4 - Wizard Step4 Stack（.pen ノード `Rvcpy` > `SH26O`）

### 仕様
- 技術スタックリストの**最上部**に検索フィールドを1つ配置（ノード `orn8H`）
- プレースホルダー: `"技術スタックを検索"`
- 検索結果はカテゴリ（フロントエンド / バックエンド / DB）をまたいで絞り込む

```
[ 技術スタックを検索 🔍 ]
─────────────────────────
フロントエンド
  □ React  □ Next.js  □ Vue ...
バックエンド
  □ Node.js  □ Go ...
データベース
  □ PostgreSQL  □ MySQL ...
```

---

## 4. ロードマップ — ガントチャート・個人ビューのルート構成

### ルート定義

| 画面 | ルート | .pen ノード ID | 表示方法 |
|------|-------|--------------|--------|
| ロードマップ（カンバン） | `/roadmap` | `076U3` | デフォルトタブ |
| ガントチャート | `/roadmap/gantt` | `LB42t` | タブ切り替え |
| 個人ビュー | `/roadmap/personal` | `4Fcgp` | タブ切り替え |

### タブ実装方針
- `src/app/(dashboard)/roadmap/` 配下にネストルートとして実装
- タブ UI はロードマップ画面上部に配置し、タブクリックで **URL を変更**する（`router.push`）
- サーバーサイドでタブの選択状態を判定できるようにする

```
src/app/(dashboard)/roadmap/
├── layout.tsx         ← タブ UI を含む共通レイアウト
├── page.tsx           ← カンバンビュー（/roadmap）
├── gantt/
│   └── page.tsx       ← ガントチャート（/roadmap/gantt）
└── personal/
    └── page.tsx       ← 個人ビュー（/roadmap/personal）
```

```tsx
// layout.tsx — タブ定義例
const TABS = [
  { label: "カンバン",         href: "/roadmap" },
  { label: "ガントチャート",    href: "/roadmap/gantt" },
  { label: "個人ビュー",       href: "/roadmap/personal" },
];
```

---

## 5. スプリント画面の廃止

- **スプリント専用画面は存在しない**（.pen にもスプリント画面はない）
- スプリント管理はカンバン（`/roadmap`）に統合されている
- バックログ / スプリント切り替えはカンバン内のフィルター・タブで実現する
- `Sprint` という独立ルート（`/sprint` 等）は作成しないこと

---

## 6. AI 保存フロー — 3 ステップ遷移

**対象画面**: W5 確認・生成 → Confirm → Saving → Complete

### 遷移図

```
W5（確認・生成）
    ↓ [生成ボタン押下]
Screen AI - Confirm Save  ← /setup/confirm または モーダル
    ↓ [保存ボタン押下]
Screen AI - Saving        ← ローディング状態（自動遷移）
    ↓ [保存完了]
Screen AI - Save Complete ← 完了通知 → /dashboard へ遷移
```

### .pen ノード対応

| ステップ | 画面名 | .pen ノード ID | サイドバー表示 |
|---------|-------|--------------|-------------|
| Step 1 | Screen AI - Confirm Save | `178yW` | 保存確認（`save` icon） |
| Step 2 | Screen AI - Saving | `VPTC7` | 保存中（`cloud_upload` icon） |
| Step 3 | Screen AI - Save Complete | `Ax4gU` | 保存完了（`check_circle` icon） |

### 実装上の注意
- Confirm → Saving は**自動遷移しない**（ユーザーが保存ボタンを押すことで開始）
- Saving → Complete は**自動遷移**（API レスポンス完了後）
- Complete 画面には `/dashboard` または `/roadmap` へのリンクボタンを表示
- エラー時は Confirm 画面に戻りエラーメッセージを表示する

```tsx
// AI 保存フロー 状態管理例
type SaveStep = "confirm" | "saving" | "complete" | "error";
```

---

## 画面一覧（.pen ノード対応表）

| カテゴリ | 画面名 | ルート | .pen ノード ID |
|---------|-------|-------|--------------|
| 認証 | ログイン | `/login` | `6Hes1` |
| 認証 | 新規登録 | `/register` | `dXIpB` |
| 認証 | オンボーディング | `/onboarding` | `FVq4l` |
| ダッシュボード | ダッシュボード（空） | `/dashboard` | `xV9c2` |
| ダッシュボード | ダッシュボード（通常） | `/dashboard` | `NL9xW` |
| ロードマップ | カンバン | `/roadmap` | `076U3` |
| ロードマップ | ガントチャート | `/roadmap/gantt` | `LB42t` |
| ロードマップ | 個人ビュー | `/roadmap/personal` | `4Fcgp` |
| タスク | タスク詳細 | `/tasks/:id` | `pzMY5` |
| カンバン | タスク追加モーダル | `/roadmap`（モーダル） | `OgsOb` |
| チーム | チーム管理 | `/teams` | `6XBil` |
| チーム | 招待モーダル | `/teams`（モーダル） | `zkZ24` |
| AI | AI 生成結果 | `/ai/result` | `hdVeE` |
| AI | タスクビュー | `/ai/result/tasks` | `4eNm1` |
| AI | 生成ローディング | `/setup/generating` | `wO7GG` |
| AI 保存 | 保存確認 | `/setup/confirm` | `178yW` |
| AI 保存 | 保存中 | `/setup/saving` | `VPTC7` |
| AI 保存 | 保存完了 | `/setup/complete` | `Ax4gU` |
| セットアップ | W1 プロジェクト情報 | `/setup/project` | `TTVAF` |
| セットアップ | W2 機能・要件選択 | `/setup/features` | `NnJLH` |
| セットアップ | W3 チーム設定 | `/setup/team` | `SatBd` |
| セットアップ | W4 技術スタック | `/setup/stack` | `Rvcpy` |
| セットアップ | W5 確認・生成 | `/setup/confirm-generate` | `wH7gM` |

---

*最終更新: 2026-03-14*
