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

function mapRequirementDto(dto: unknown): Requirement {
  if (
    !dto ||
    typeof dto !== 'object' ||
    typeof (dto as Record<string, unknown>).id !== 'string' ||
    typeof (dto as Record<string, unknown>).teamId !== 'string' ||
    typeof (dto as Record<string, unknown>).status !== 'string'
  ) {
    throw new Error('Invalid response structure from API')
  }
  return dto as Requirement
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('リクエストがタイムアウトしました。しばらく時間をおいて再度お試しください。')
    }
    throw err
  } finally {
    clearTimeout(timer)
  }
}

export async function saveRequirement(input: SaveRequirementInput): Promise<Requirement> {
  if (!input.teamId.trim()) throw new Error('チームIDが指定されていません')

  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetchWithTimeout(
    `${apiUrl}/api/v1/teams/${encodeURIComponent(input.teamId)}/requirements`,
    {
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
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to save requirement: ${res.status}`)
  }

  const data = await res.json()
  return mapRequirementDto(data)
}

export async function getRequirement(teamId: string, reqId: string): Promise<Requirement> {
  if (!teamId.trim()) throw new Error('チームIDが指定されていません')
  if (!reqId.trim()) throw new Error('要件IDが指定されていません')

  const apiUrl = process.env.API_URL
  if (!apiUrl) throw new Error('API_URL environment variable is not set')

  const res = await fetchWithTimeout(
    `${apiUrl}/api/v1/teams/${encodeURIComponent(teamId)}/requirements/${encodeURIComponent(reqId)}`,
    { cache: 'no-store' } as RequestInit
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch requirement: ${res.status}`)
  }

  const data = await res.json()
  return mapRequirementDto(data)
}
