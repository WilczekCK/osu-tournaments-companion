import { create } from 'zustand'

type Mode = 'standard' | 'taiko' | 'ctb' | 'mania'

interface ModeSelectState {
  modesSelected: Mode[]
  removeMode: (mode: Mode) => void
  insertMode: (mode: Mode) => void
  toggleMode: (mode: Mode) => void
}

export const useModeSelectStore = create<ModeSelectState>((set) => ({
  modesSelected: [],
  removeMode: (mode: Mode) =>
    set((state) => ({
      modesSelected: state.modesSelected.filter((m) => m !== mode)
    })),
  insertMode: (mode: Mode) =>
    set((state) => ({ modesSelected: [...state.modesSelected, mode] })),
  toggleMode: (mode: Mode) =>
    set((state) => {
      if (state.modesSelected.includes(mode)) {
        state.removeMode(mode)
      } else {
        state.insertMode(mode)
      }

      return {}
    })
}))
