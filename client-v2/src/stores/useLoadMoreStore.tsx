import { create } from 'zustand'

interface LoadMoreStore {
  toggled: boolean,
  tournaments: Tournament[],
  setToggle: () => void
}

export const useLoadMoreStore = create<LoadMoreStore>((set) => ({
  toggled: false,
  tournaments: [],

  setToggle: () =>
    set((state) => ({toggled: !state.toggled})
  ),
}))
