'use server'

import type { ProductType, ExperienceLevel, Requirement } from '@/types/requirements'

type SaveRequirementInput = {
  teamId: string
  projectName: string
  projectOverview: string
  productType: ProductType
  selectedFeatures: string[]
  techStack: string[]
  memberCount: number
  startDate: string
  releaseDate: string
  experienceLevel: ExperienceLevel
  freeText: string
  supplementUrl: string
}

export async function saveRequirement(input: SaveRequirementInput): Promise<Requirement> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(`${apiUrl}/api/v1/teams/${encodeURIComponent(input.teamId)}/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      project_name:      input.projectName,
      project_overview:  input.projectOverview,
      product_type:      input.productType,
      selected_features: input.selectedFeatures,
      tech_stack:        input.techStack,
      member_count:      input.memberCount,
      start_date:        input.startDate,
      release_date:      input.releaseDate,
      experience_level:  input.experienceLevel,
      free_text:         input.freeText || null,
      supplement_url:    input.supplementUrl || null,
    }),
  })

  if (!res.ok) {
    throw new Error(`Failed to save requirement: ${res.status}`)
  }

  const data = await res.json()
  if (!data?.id) throw new Error('Invalid response from API')
  return data as Requirement
}

export async function getRequirement(teamId: string, reqId: string): Promise<Requirement> {
  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetch(`${apiUrl}/api/v1/teams/${encodeURIComponent(teamId)}/requirements/${encodeURIComponent(reqId)}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch requirement: ${res.status}`)
  }

  const data = await res.json()
  if (!data?.id) throw new Error('Invalid response from API')
  return data as Requirement
}
