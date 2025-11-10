import { create } from 'zustand'

interface SearchStoreState {
  searchPhrase: string
  setPhrase: (phrase: string) => void
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  searchPhrase: '',
  setPhrase: (phrase: string) =>
    set((state) => ({ searchPhrase: phrase })),
}))
