'use server'

import type { UserProfile, SaveProfileInput } from '@/types/profile'

export async function getProfile(userId: string): Promise<UserProfile> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(`${apiUrl}/api/v1/users/${encodeURIComponent(userId)}/profile`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch profile: ${res.status}`)
  }

  const data = await res.json()
  if (!data?.id) throw new Error('Invalid response from API')
  // [M-3] Explicit snake_case → camelCase mapping instead of blind type assertion
  return {
    id:             data.id,
    name:           data.name,
    email:          data.email,
    bio:            data.bio ?? '',
    avatarUrl:      data.avatar_url ?? null,
    expertSkills:   data.expert_skills ?? [],
    learningSkills: data.learning_skills ?? [],
  } satisfies UserProfile
}

export async function saveProfile(input: SaveProfileInput): Promise<UserProfile> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(`${apiUrl}/api/v1/users/${encodeURIComponent(input.userId)}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:            input.name,
      bio:             input.bio || null,
      expert_skills:   input.expertSkills,
      learning_skills: input.learningSkills,
      avatar_url:      input.avatarUrl ?? null,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to save profile: ${res.status}`)
  }

  const data = await res.json()
  if (!data?.id) throw new Error('Invalid response from API')
  // [M-3] Explicit snake_case → camelCase mapping instead of blind type assertion
  return {
    id:             data.id,
    name:           data.name,
    email:          data.email,
    bio:            data.bio ?? '',
    avatarUrl:      data.avatar_url ?? null,
    expertSkills:   data.expert_skills ?? [],
    learningSkills: data.learning_skills ?? [],
  } satisfies UserProfile
}
