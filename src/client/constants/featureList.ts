import type { ProductType } from '@/types/requirements'

export type FeatureCategory = {
  id: string
  label: string
  features: string[]
}

export const FEATURE_LIST: Record<ProductType, FeatureCategory[]> = {
  web: [
    {
      id: 'auth',
      label: '認証・ユーザー管理',
      features: ['認証・ログイン', 'ユーザー管理'],
    },
    {
      id: 'collab',
      label: 'チーム・コラボ',
      features: ['チーム機能', '通知'],
    },
    {
      id: 'payment',
      label: '決済・外部連携',
      features: ['決済', 'API連携'],
    },
    {
      id: 'content',
      label: 'コンテンツ・UI',
      features: ['地図', 'ファイルアップロード', 'ダッシュボード', '検索'],
    },
  ],
  app: [
    {
      id: 'auth',
      label: '認証・セキュリティ',
      features: ['認証・ログイン', '生体認証'],
    },
    {
      id: 'notification',
      label: '通知・メッセージ',
      features: ['プッシュ通知', 'チャット'],
    },
    {
      id: 'device',
      label: 'デバイス連携',
      features: ['カメラ/ギャラリー', '位置情報'],
    },
    {
      id: 'platform',
      label: 'プラットフォーム',
      features: ['オフライン対応', '決済'],
    },
  ],
  game: [
    {
      id: 'core',
      label: 'コア機能',
      features: ['ユーザー認証', 'セーブデータ', 'アイテム管理'],
    },
    {
      id: 'social',
      label: 'ソーシャル',
      features: ['スコアランキング', 'マルチプレイ'],
    },
    {
      id: 'monetization',
      label: '課金・収益',
      features: ['ガチャ/課金'],
    },
  ],
  ai: [
    {
      id: 'ui',
      label: 'UI・入出力',
      features: ['データ入力UI', '結果表示'],
    },
    {
      id: 'ai',
      label: 'AI連携',
      features: ['AI推論API連携', 'ファインチューニング管理'],
    },
    {
      id: 'data',
      label: 'データ管理',
      features: ['履歴管理', 'フィードバック'],
    },
  ],
}
