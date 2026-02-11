import { AppState } from './types'

const STORAGE_KEY = 'money-sandbox-state'
const STORAGE_VERSION = '1.0.0'

export function loadState(): AppState | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored)
    
    // Version migration logic
    if (parsed.storageVersion !== STORAGE_VERSION) {
      // For MVP, if version mismatch, clear and start fresh
      console.warn('Storage version mismatch, clearing data')
      clearAllData()
      return null
    }

    return parsed as AppState
  } catch (error) {
    console.error('Failed to load state from localStorage:', error)
    return null
  }
}

export function saveState(state: AppState): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const stateWithVersion = {
      ...state,
      storageVersion: STORAGE_VERSION,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithVersion))
  } catch (error) {
    console.error('Failed to save state to localStorage:', error)
  }
}

export function exportData(): string {
  const state = loadState()
  if (!state) {
    return JSON.stringify({ scenarios: [], currentScenarioId: null, baselineScenarioId: null })
  }
  return JSON.stringify(state, null, 2)
}

export function importData(json: string): AppState | null {
  try {
    const parsed = JSON.parse(json)
    
    // Validate structure
    if (!parsed.scenarios || !Array.isArray(parsed.scenarios)) {
      throw new Error('Invalid data format')
    }

    const importedState: AppState = {
      scenarios: parsed.scenarios,
      currentScenarioId: parsed.currentScenarioId || null,
      baselineScenarioId: parsed.baselineScenarioId || null,
      storageVersion: STORAGE_VERSION,
    }

    return importedState
  } catch (error) {
    console.error('Failed to import data:', error)
    return null
  }
}

export function clearAllData(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear localStorage:', error)
  }
}

export { STORAGE_VERSION }
