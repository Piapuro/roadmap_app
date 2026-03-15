export type UserProfile = {
  id: string
  name: string
  email: string
  bio: string
  avatarUrl: string | null
  expertSkills: string[]
  learningSkills: string[]
}

export type SaveProfileInput = {
  userId: string
  name: string
  bio: string
  expertSkills: string[]
  learningSkills: string[]
  avatarUrl?: string | null
}
