export type TechCategory = {
  id: string
  label: string
  features: string[]
}

export const TECH_STACK_LIST: TechCategory[] = [
  {
    id: 'frontend',
    label: 'フロントエンド',
    features: ['React', 'Vue.js', 'Next.js', 'Nuxt', 'Angular', 'Svelte'],
  },
  {
    id: 'backend',
    label: 'バックエンド',
    features: [
      'Node.js / Express',
      'Python / FastAPI',
      'Python / Django',
      'Ruby / Rails',
      'Go',
      'Java / Spring Boot',
    ],
  },
  {
    id: 'mobile',
    label: 'モバイル',
    features: ['React Native', 'Flutter', 'Swift / iOS', 'Kotlin / Android'],
  },
  {
    id: 'database',
    label: 'データベース',
    features: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
  },
  {
    id: 'infra',
    label: 'インフラ',
    features: ['AWS', 'GCP', 'Azure', 'Vercel', 'Netlify', 'Docker / Kubernetes'],
  },
  {
    id: 'ai',
    label: 'AI・ML',
    features: ['OpenAI API', 'Claude API', 'PyTorch', 'TensorFlow', 'Hugging Face'],
  },
]
