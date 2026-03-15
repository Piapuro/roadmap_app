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
