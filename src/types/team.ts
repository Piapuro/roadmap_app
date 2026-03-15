export type Role = 'OWNER' | 'MEMBER' | 'VIEWER'

export const ROLE_ORDER: Record<Role, number> = {
  OWNER:  3,
  MEMBER: 2,
  VIEWER: 1,
}

export function isDemotion(from: Role, to: Role): boolean {
  return ROLE_ORDER[to] < ROLE_ORDER[from]
}

export type TeamMember = {
  id: string
  name: string
  email: string
  role: Role
  joinedAt: string // ISO date string
}

export type UpdateRoleInput = {
  teamId: string
  memberId: string
  role: Role
}

export type TeamLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'

export const LEVEL_LABEL: Record<TeamLevel, string> = {
  BEGINNER:     '初級（Beginner）',
  INTERMEDIATE: '中級（Intermediate）',
  ADVANCED:     '上級（Advanced）',
}

export type TeamSettings = {
  id: string
  name: string
  startDate: string // YYYY-MM-DD
  endDate: string   // YYYY-MM-DD
  goal: string
  level: TeamLevel
}

export type UpdateTeamSettingsInput = {
  teamId: string
  name: string
  startDate: string
  endDate: string
  goal: string
  level: TeamLevel
}
