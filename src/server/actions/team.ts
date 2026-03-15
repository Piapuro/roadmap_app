'use server'

import type { TeamMember, TeamSettings, UpdateRoleInput, UpdateTeamSettingsInput } from '@/types/team'

// ─── Members ───────────────────────────────────────────────────────────────

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
  return (data as any[]).map(d => ({
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

// ─── Team Settings ─────────────────────────────────────────────────────────

export async function getTeamSettings(teamId: string): Promise<TeamSettings> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(
    `${apiUrl}/api/v1/teams/${encodeURIComponent(teamId)}/settings`,
    { cache: 'no-store' }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch team settings: ${res.status}`)
  }

  const d: any = await res.json()
  return {
    id:        d.id,
    name:      d.name,
    startDate: d.start_date ?? d.startDate ?? '',
    endDate:   d.end_date   ?? d.endDate   ?? '',
    goal:      d.goal       ?? '',
    level:     d.level      ?? 'INTERMEDIATE',
  } satisfies TeamSettings
}

export async function updateTeamSettings(input: UpdateTeamSettingsInput): Promise<TeamSettings> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(
    `${apiUrl}/api/v1/teams/${encodeURIComponent(input.teamId)}/settings`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:       input.name,
        start_date: input.startDate,
        end_date:   input.endDate,
        goal:       input.goal,
        level:      input.level,
      }),
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to update team settings: ${res.status}`)
  }

  const d: any = await res.json()
  return {
    id:        d.id,
    name:      d.name,
    startDate: d.start_date ?? d.startDate ?? '',
    endDate:   d.end_date   ?? d.endDate   ?? '',
    goal:      d.goal       ?? '',
    level:     d.level      ?? 'INTERMEDIATE',
  } satisfies TeamSettings
}
