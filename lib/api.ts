// API Service for Django Backend Integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export interface APIError extends Error {
  status?: number
  response?: unknown
}

/**
 * Fetch wrapper with error handling
 * @param endpoint - API endpoint (e.g., '/skills/')
 * @param options - Fetch options
 */
export const fetchAPI = async (
  endpoint: string,
  options?: RequestInit
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error: APIError = new Error(`API error: ${response.status}`)
      error.status = response.status
      error.response = await response.json().catch(() => null)
      throw error
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`[API] Error fetching ${endpoint}:`, error)
    throw error
  }
}

/**
 * Get Skills - Frontend, Backend, Tools, Design
 */
export const getSkills = () => fetchAPI('/skills/')

/**
 * Get Education - Degrees and Certifications
 */
export const getEducation = () => fetchAPI('/education/')

/**
 * Get Experience - Work History
 */
export const getExperience = () => fetchAPI('/experience/')

/**
 * Get Projects - Portfolio Projects
 */
export const getProjects = () => fetchAPI('/projects/')

/**
 * Get About Section
 */
export const getAbout = () => fetchAPI('/about/')

/**
 * Post Contact Message
 */
export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

export const sendContactMessage = (data: ContactMessage) =>
  fetchAPI('/contact/', {
    method: 'POST',
    body: JSON.stringify(data),
  })
