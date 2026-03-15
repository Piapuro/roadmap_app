'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, X, Upload, Search } from 'lucide-react'
import { cn } from '@/client/lib/cn'
import { saveProfile } from '@/server/actions/profile'
import { TECH_STACK_LIST } from '@/client/constants/techStackList'
import type { UserProfile } from '@/types/profile'

const ALL_TECHS = TECH_STACK_LIST.flatMap(c => c.features)

type FormState = {
  name: string
  bio: string
  expertSkills: string[]
  learningSkills: string[]
  avatarPreviewUrl: string | null
}

type FormErrors = {
  name?: string
  bio?: string
  general?: string
}

const MOCK_USER: UserProfile = {
  id: 'mock-user-id', // TODO: replace with Supabase session userId (#006)
  name: '',
  email: 'user@example.com', // TODO: replace with Supabase session email (#006)
  bio: '',
  avatarUrl: null,
  expertSkills: [],
  learningSkills: [],
}

export function ProfileForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormState>({
    name: MOCK_USER.name,
    bio: MOCK_USER.bio,
    expertSkills: [...MOCK_USER.expertSkills],
    learningSkills: [...MOCK_USER.learningSkills],
    avatarPreviewUrl: MOCK_USER.avatarUrl,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isPending, setIsPending] = useState(false)

  // Skill add UI state
  const [expertSearch, setExpertSearch] = useState('')
  const [isAddingExpert, setIsAddingExpert] = useState(false)
  const [learnSearch, setLearnSearch] = useState('')
  const [isAddingLearn, setIsAddingLearn] = useState(false)

  // [C-1] Revoke blob URL when it changes or on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (form.avatarPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(form.avatarPreviewUrl)
      }
    }
  }, [form.avatarPreviewUrl])

  // Dropdown candidates: exclude already-selected skills from both lists
  const usedSkills = new Set([...form.expertSkills, ...form.learningSkills])
  const expertOptions = ALL_TECHS.filter(
    t => !usedSkills.has(t) && t.toLowerCase().includes(expertSearch.toLowerCase())
  )
  const learnOptions = ALL_TECHS.filter(
    t => !usedSkills.has(t) && t.toLowerCase().includes(learnSearch.toLowerCase())
  )

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!form.name.trim()) {
      next.name = '名前を入力してください'
    }
    // maxLength={50} on the input already prevents exceeding 50 chars
    if (form.bio.length > 200) {
      next.bio = '自己紹介は200文字以内で入力してください'
    }
    return next
  }

  async function handleSave() {
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    setErrors({})
    setIsPending(true)
    try {
      await saveProfile({
        userId: MOCK_USER.id,
        name: form.name.trim(),
        bio: form.bio,
        expertSkills: form.expertSkills,
        learningSkills: form.learningSkills,
        avatarUrl: form.avatarPreviewUrl,
      })
      router.push('/')
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : '保存に失敗しました' })
    } finally {
      setIsPending(false)
    }
  }

  // [S-2] Single cancel handler
  function handleCancel() {
    router.push('/')
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    // [C-1] Revoke previous blob URL
    if (form.avatarPreviewUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(form.avatarPreviewUrl)
    }
    const url = URL.createObjectURL(file)
    setForm(f => ({ ...f, avatarPreviewUrl: url }))
    // TODO: upload to Supabase Storage (#006)
  }

  function addSkill(type: 'expert' | 'learn', tech: string) {
    const key = type === 'expert' ? 'expertSkills' : 'learningSkills'
    if (!form[key].includes(tech)) {
      setForm(f => ({ ...f, [key]: [...f[key], tech] }))
    }
    if (type === 'expert') { setExpertSearch(''); setIsAddingExpert(false) }
    else { setLearnSearch(''); setIsAddingLearn(false) }
  }

  function removeSkill(type: 'expert' | 'learn', skill: string) {
    const key = type === 'expert' ? 'expertSkills' : 'learningSkills'
    setForm(f => ({ ...f, [key]: f[key].filter(s => s !== skill) }))
  }

  const initials = form.name
    ? form.name.trim().slice(0, 2).toUpperCase()
    : MOCK_USER.email.slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-[#F2F3F0]">
      {/* Top bar */}
      <header className="h-16 flex items-center justify-between px-10 bg-[#F2F3F0] border-b border-[#CBCCC9] shrink-0">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-2 text-sm font-medium text-[#111111] hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          ダッシュボードに戻る
        </button>

        <div className="flex items-center gap-3">
          {errors.general && (
            <p role="alert" className="text-xs text-red-500 font-[family-name:var(--font-geist-sans)]">
              {errors.general}
            </p>
          )}
          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className="h-9 px-5 rounded-lg border border-[#CBCCC9] bg-transparent text-sm font-semibold text-[#111111] hover:bg-[#e5e6e3] transition-colors disabled:opacity-50"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="h-9 px-5 rounded-lg bg-[#FF8400] text-sm font-semibold text-[#111111] hover:bg-[#e67700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isPending && (
              <span className="w-3.5 h-3.5 border-2 border-[#111111]/30 border-t-[#111111] rounded-full animate-spin" />
            )}
            保存する
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col items-center gap-5 py-10 px-4">
        {/* Avatar card */}
        <div className="w-full max-w-[800px] bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#CBCCC9]">
          <div className="flex items-center gap-6">
            <div className="shrink-0">
              {form.avatarPreviewUrl ? (
                <img
                  src={form.avatarPreviewUrl}
                  alt="avatar"
                  width={72}
                  height={72}
                  className="w-[72px] h-[72px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[72px] h-[72px] rounded-full bg-[#F2F3F0] flex items-center justify-center">
                  <span className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-xl font-bold">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-geist-sans)] text-sm text-[#666666]">
                プロフィール画像
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 h-9 px-4 rounded-lg border border-[#CBCCC9] bg-transparent text-sm font-medium text-[#111111] hover:bg-[#e5e6e3] transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                画像を変更
              </button>
              <p className="font-[family-name:var(--font-geist-sans)] text-xs text-[#666666]">
                PNG・JPG・GIF (最大 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Basic info card */}
        <div className="w-full max-w-[800px] bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#CBCCC9]">
          <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-base font-bold mb-1">
            基本情報
          </h2>
          <div className="h-px bg-[#CBCCC9] mb-6" />

          <div className="flex flex-col gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="profile-name"
                className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
              >
                名前
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="profile-name"
                type="text"
                value={form.name}
                maxLength={50}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="山田 太郎"
                className={cn(
                  'h-10 w-full rounded-lg border bg-[#F2F3F0] px-4 text-sm text-[#111111] placeholder:text-[#999999] outline-none transition-colors',
                  'focus:ring-2 focus:ring-[#FF8400]/30 focus:border-[#FF8400]',
                  errors.name ? 'border-red-500' : 'border-[#CBCCC9]'
                )}
              />
              {errors.name && (
                <p className="text-xs text-red-500 font-[family-name:var(--font-geist-sans)]">{errors.name}</p>
              )}
            </div>

            {/* Email (read-only) */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="profile-email"
                className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
              >
                メールアドレス
              </label>
              <input
                id="profile-email"
                type="email"
                value={MOCK_USER.email}
                disabled
                className="h-10 w-full rounded-lg border border-[#CBCCC9] bg-[#F2F3F0] px-4 text-sm text-[#999999] outline-none cursor-not-allowed opacity-70"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="profile-bio"
                  className="text-sm font-medium text-[#111111] font-[family-name:var(--font-geist-sans)]"
                >
                  自己紹介
                </label>
                <span className={cn(
                  'text-xs font-[family-name:var(--font-geist-sans)]',
                  form.bio.length > 200 ? 'text-red-500' : 'text-[#666666]'
                )}>
                  {form.bio.length} / 200
                </span>
              </div>
              <textarea
                id="profile-bio"
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="自己紹介を入力してください（任意）"
                rows={4}
                className={cn(
                  'w-full rounded-lg border bg-[#F2F3F0] px-4 py-3 text-sm text-[#111111] placeholder:text-[#999999] outline-none transition-colors resize-none',
                  'focus:ring-2 focus:ring-[#FF8400]/30 focus:border-[#FF8400]',
                  errors.bio ? 'border-red-500' : 'border-[#CBCCC9]'
                )}
              />
              {errors.bio && (
                <p className="text-xs text-red-500 font-[family-name:var(--font-geist-sans)]">{errors.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Skills card */}
        <div className="w-full max-w-[800px] bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#CBCCC9]">
          <h2 className="font-[family-name:var(--font-jetbrains-mono)] text-[#111111] text-base font-bold mb-1">
            スキル・技術
          </h2>
          <div className="h-px bg-[#CBCCC9] mb-6" />

          {/* Expert skills */}
          <div className="flex flex-col gap-3 mb-6">
            <p className="text-sm font-semibold text-[#111111] font-[family-name:var(--font-geist-sans)]">
              得意技術
            </p>
            <div className="flex flex-wrap gap-2">
              {form.expertSkills.map(skill => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 rounded-full bg-[#F2F3F0] border border-[#CBCCC9] px-3 py-1 text-sm text-[#111111] font-[family-name:var(--font-geist-sans)]"
                >
                  {skill}
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => removeSkill('expert', skill)}
                    className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#CBCCC9] transition-colors"
                    aria-label={`${skill}を削除`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {isAddingExpert ? (
                <div className="relative">
                  <div className="flex items-center gap-1.5 h-7 rounded-full border border-[#FF8400] bg-[#F2F3F0] px-3 w-48">
                    <Search className="w-3 h-3 text-[#FF8400] shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={expertSearch}
                      onChange={e => setExpertSearch(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Escape') { setIsAddingExpert(false); setExpertSearch('') }
                        if (e.key === 'Enter' && expertOptions[0]) { e.preventDefault(); addSkill('expert', expertOptions[0]) }
                      }}
                      onBlur={() => { setIsAddingExpert(false); setExpertSearch('') }}
                      placeholder="技術を検索..."
                      className="flex-1 bg-transparent text-sm text-[#111111] placeholder:text-[#999999] outline-none min-w-0"
                    />
                  </div>
                  {expertOptions.length > 0 && (
                    <ul className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#CBCCC9] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] z-20 overflow-hidden max-h-52 overflow-y-auto">
                      {expertOptions.map((tech, i) => (
                        <li key={tech}>
                          <button
                            type="button"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => addSkill('expert', tech)}
                            className={cn(
                              'w-full text-left px-4 py-2.5 text-sm text-[#111111] font-[family-name:var(--font-geist-sans)] hover:bg-[#F2F3F0] transition-colors',
                              i > 0 && 'border-t border-[#F2F3F0]'
                            )}
                          >
                            {tech}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {expertSearch && expertOptions.length === 0 && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#CBCCC9] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] z-20 px-4 py-3 text-sm text-[#999999] font-[family-name:var(--font-geist-sans)]">
                      候補が見つかりません
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingExpert(true)}
                  className="flex items-center gap-1 rounded-full border border-dashed border-[#CBCCC9] px-3 py-1 text-sm text-[#666666] hover:border-[#FF8400] hover:text-[#FF8400] transition-colors font-[family-name:var(--font-geist-sans)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  追加
                </button>
              )}
            </div>
          </div>

          <div className="h-px bg-[#CBCCC9] mb-6" />

          {/* Learning skills */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[#111111] font-[family-name:var(--font-geist-sans)]">
              学習中の技術
            </p>
            <div className="flex flex-wrap gap-2">
              {form.learningSkills.map(skill => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 text-sm text-[#1d4ed8] font-[family-name:var(--font-geist-sans)]"
                >
                  {skill}
                  <button
                    type="button"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => removeSkill('learn', skill)}
                    className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-[#bfdbfe] transition-colors"
                    aria-label={`${skill}を削除`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}

              {isAddingLearn ? (
                <div className="relative">
                  <div className="flex items-center gap-1.5 h-7 rounded-full border border-[#1d4ed8] bg-[#eff6ff] px-3 w-48">
                    <Search className="w-3 h-3 text-[#1d4ed8] shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={learnSearch}
                      onChange={e => setLearnSearch(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Escape') { setIsAddingLearn(false); setLearnSearch('') }
                        if (e.key === 'Enter' && learnOptions[0]) { e.preventDefault(); addSkill('learn', learnOptions[0]) }
                      }}
                      onBlur={() => { setIsAddingLearn(false); setLearnSearch('') }}
                      placeholder="技術を検索..."
                      className="flex-1 bg-transparent text-sm text-[#1d4ed8] placeholder:text-[#93c5fd] outline-none min-w-0"
                    />
                  </div>
                  {learnOptions.length > 0 && (
                    <ul className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#CBCCC9] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] z-20 overflow-hidden max-h-52 overflow-y-auto">
                      {learnOptions.map((tech, i) => (
                        <li key={tech}>
                          <button
                            type="button"
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => addSkill('learn', tech)}
                            className={cn(
                              'w-full text-left px-4 py-2.5 text-sm text-[#111111] font-[family-name:var(--font-geist-sans)] hover:bg-[#eff6ff] transition-colors',
                              i > 0 && 'border-t border-[#F2F3F0]'
                            )}
                          >
                            {tech}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {learnSearch && learnOptions.length === 0 && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#CBCCC9] rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.10)] z-20 px-4 py-3 text-sm text-[#999999] font-[family-name:var(--font-geist-sans)]">
                      候補が見つかりません
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingLearn(true)}
                  className="flex items-center gap-1 rounded-full border border-dashed border-[#bfdbfe] px-3 py-1 text-sm text-[#1d4ed8] hover:border-[#1d4ed8] transition-colors font-[family-name:var(--font-geist-sans)]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  追加
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-6" />
      </div>
    </div>
  )
}
