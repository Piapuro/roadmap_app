'use server'

import type { TeamMember, UpdateRoleInput } from '@/types/team'

export async function getMembers(teamId: string): Promise<TeamMember[]> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(
    `${apiUrl}/api/v1/teams/${encodeURIComponent(teamId)}/members`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch members: ${res.status}`)
  }

  const data: unknown[] = await res.json()
  return data.map((d: any) => ({
    id:       d.id,
    name:     d.name,
    email:    d.email,
    role:     d.role,
    joinedAt: d.joined_at ?? d.joinedAt ?? '',
  }))
}

export async function updateMemberRole(input: UpdateRoleInput): Promise<TeamMember> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(
    `${apiUrl}/api/v1/teams/${encodeURIComponent(input.teamId)}/members/${encodeURIComponent(input.memberId)}/role`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: input.role }),
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to update role: ${res.status}`)
  }

  const d: any = await res.json()
  return {
    id:       d.id,
    name:     d.name,
    email:    d.email,
    role:     d.role,
    joinedAt: d.joined_at ?? d.joinedAt ?? '',
  }
}
