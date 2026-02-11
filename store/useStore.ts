import { create } from 'zustand'
import { AppState, Scenario, FinancialInputs, Bill, Subscription } from '../lib/types'
import { loadState, saveState, importData } from '../lib/storage'

interface Store extends AppState {
  // Actions
  createBaseline: (inputs: FinancialInputs) => void
  duplicateScenario: (id: string, name: string) => void
  updateScenario: (id: string, inputs: FinancialInputs) => void
  deleteScenario: (id: string) => void
  setCurrentScenario: (id: string) => void
  addBill: (scenarioId: string, bill: Bill) => void
  updateBill: (scenarioId: string, billId: string, bill: Bill) => void
  removeBill: (scenarioId: string, billId: string) => void
  addSubscription: (scenarioId: string, subscription: Subscription) => void
  updateSubscription: (scenarioId: string, subId: string, subscription: Subscription) => void
  removeSubscription: (scenarioId: string, subId: string) => void
  cancelSubscription: (scenarioId: string, subId: string) => void
  pauseSubscription: (scenarioId: string, subId: string, month: number) => void
  initialize: () => void
  importState: (state: AppState) => void
}

export const useStore = create<Store>((set, get) => ({
  scenarios: [],
  currentScenarioId: null,
  baselineScenarioId: null,
  storageVersion: '1.0.0',

  initialize: () => {
    const state = get()
    // Only initialize if state is empty (not already loaded)
    if (state.scenarios.length === 0 && !state.currentScenarioId && !state.baselineScenarioId) {
      const loaded = loadState()
      if (loaded) {
        set(loaded)
      }
    }
  },

  createBaseline: (inputs: FinancialInputs) => {
    const baseline: Scenario = {
      id: 'baseline',
      name: 'Baseline',
      inputs,
      createdAt: new Date().toISOString(),
    }

    set((state) => {
      const newState = {
        ...state,
        scenarios: [baseline],
        currentScenarioId: 'baseline',
        baselineScenarioId: 'baseline',
      }
      saveState(newState)
      return newState
    })
  },

  duplicateScenario: (id: string, name: string) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === id)
    if (!scenario) return

    const newScenario: Scenario = {
      id: `scenario-${Date.now()}`,
      name,
      inputs: JSON.parse(JSON.stringify(scenario.inputs)), // Deep clone
      createdAt: new Date().toISOString(),
    }

    set((state) => {
      const newState = {
        ...state,
        scenarios: [...state.scenarios, newScenario],
        currentScenarioId: newScenario.id,
      }
      saveState(newState)
      return newState
    })
  },

  updateScenario: (id: string, inputs: FinancialInputs) => {
    set((state) => {
      const newState = {
        ...state,
        scenarios: state.scenarios.map((s) =>
          s.id === id ? { ...s, inputs } : s
        ),
      }
      saveState(newState)
      return newState
    })
  },

  deleteScenario: (id: string) => {
    const state = get()
    
    // Prevent deletion if it's the last scenario
    if (state.scenarios.length <= 1) {
      return
    }

    // Prevent deletion of baseline
    if (id === state.baselineScenarioId) {
      return
    }

    set((state) => {
      const newState = {
        ...state,
        scenarios: state.scenarios.filter((s) => s.id !== id),
        currentScenarioId:
          state.currentScenarioId === id
            ? state.baselineScenarioId
            : state.currentScenarioId,
      }
      saveState(newState)
      return newState
    })
  },

  setCurrentScenario: (id: string) => {
    set((state) => {
      const newState = { ...state, currentScenarioId: id }
      saveState(newState)
      return newState
    })
  },

  addBill: (scenarioId: string, bill: Bill) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      bills: [...scenario.inputs.bills, bill],
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  updateBill: (scenarioId: string, billId: string, bill: Bill) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      bills: scenario.inputs.bills.map((b) => (b.id === billId ? bill : b)),
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  removeBill: (scenarioId: string, billId: string) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      bills: scenario.inputs.bills.filter((b) => b.id !== billId),
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  addSubscription: (scenarioId: string, subscription: Subscription) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      subscriptions: [...scenario.inputs.subscriptions, subscription],
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  updateSubscription: (scenarioId: string, subId: string, subscription: Subscription) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      subscriptions: scenario.inputs.subscriptions.map((s) =>
        s.id === subId ? subscription : s
      ),
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  removeSubscription: (scenarioId: string, subId: string) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      subscriptions: scenario.inputs.subscriptions.filter((s) => s.id !== subId),
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  cancelSubscription: (scenarioId: string, subId: string) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      subscriptions: scenario.inputs.subscriptions.map((s) =>
        s.id === subId ? { ...s, cancelled: true } : s
      ),
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  pauseSubscription: (scenarioId: string, subId: string, month: number) => {
    const state = get()
    const scenario = state.scenarios.find((s) => s.id === scenarioId)
    if (!scenario) return

    const updatedInputs = {
      ...scenario.inputs,
      subscriptions: scenario.inputs.subscriptions.map((s) => {
        if (s.id === subId) {
          const pausedMonths = s.pausedMonths || []
          if (!pausedMonths.includes(month)) {
            return { ...s, pausedMonths: [...pausedMonths, month] }
          }
        }
        return s
      }),
    }

    get().updateScenario(scenarioId, updatedInputs)
  },

  importState: (state: AppState) => {
    set((currentState) => {
      const newState = {
        ...state,
        storageVersion: currentState.storageVersion,
      }
      saveState(newState)
      return newState
    })
  },
}))
