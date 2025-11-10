import { create } from 'zustand'
import { API_URL, LOAD_AMOUNT } from 'utils'
import axios from 'axios'
import { useModeSelectStore } from './useModeSelectStore'
import { useSearchStore } from 'stores/useSearchStore'

interface TournamentsStore {
  tournaments: Tournament[],
  addTournaments: () => void
  setTournaments: () => void
  clearTournaments: () => void
}

export const useTournamentsStore = create<TournamentsStore>((set, get) => ({
  tournaments: [],
  cursor: 0,
  status: 'idle',

  addTournaments: (newTournaments: Tournament[]) =>
    set((state) => ({tournaments: [...state.tournaments, ...newTournaments], cursor: state.cursor + 1})
  ),

  setTournaments: (newTournaments: Tournament[]) =>
    set((state) => ({tournaments: newTournaments, cursor: 0})
  ),

  clearTournaments: () =>
    set((state) => ({tournaments: [], cursor: 0})
  ),

  loadTournaments: (multiplyLoadAmount = 1) => {
    let customQuery = '';

    // Osu mode selection
    const modesSelected = useModeSelectStore.getState().modesSelected;
    if (modesSelected.length) {
      customQuery = `queryKey=gameMode&queryValue=${modesSelected.join('|')}`;
    }

    // Search phrase
    const searchPhrase = useSearchStore.getState().searchPhrase;
    if (searchPhrase.length) {
      customQuery = `queryKey=title&queryValue=${searchPhrase}`;
    }
   
    set((state) => ({ ...state, status: 'loading' }))

    axios
      .get(`${API_URL}/tournaments/?limit=${LOAD_AMOUNT*multiplyLoadAmount}&startFrom=${LOAD_AMOUNT * get().cursor}&${customQuery ?? ''}`)
      .then((response) => {
        if (!response.data || response.data.status == 404) {
          set((state) => ({ ...state, status: 'no-results' }))
        } else {
          set((state) => ({ ...state, status: 'idle' }))
          get().addTournaments(response.data); 
        }
      })
  }
}))
