import Search from '../../assets/svg/search.svg'
import Dropdown from '../../assets/svg/dropdown.svg'
import { useSearchStore } from 'stores/useSearchStore'
import { useTournamentsStore } from 'stores/useTournamentsStore'
import { useModeSelectStore } from 'stores/useModeSelectStore';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'

export default function Subheader() {
  const setSearchPhrase  = useSearchStore((state) => state.setPhrase);
  const searchPhrase     = useSearchStore((state) => state.searchPhrase);
  const clearTournaments = useTournamentsStore((state) => state.clearTournaments);
  const loadTournaments  = useTournamentsStore((state) => state.loadTournaments);
  const clearModes       = useModeSelectStore((state) => state.disableModes)

  let timeoutId: NodeJS.Timeout | null = null;

  const changeSearchPhrase = () => {
    window.clearTimeout(timeoutId);
  
    timeoutId = window.setTimeout(() => {
      clearTournaments();
      clearModes();
      loadTournaments(4);
    }, 1000);
  }

  // TODO: refactor to a single source of truth
  const innerLocation = useLocation();
  const [isTournamentPaged, setIsTournamentPage] = useState(() => {
    return innerLocation.pathname.includes('/tournament/');
  });

  return (
    <div className="flex columns-1 sm:columns-2 flex-col sm:flex-row px-8 items-center gap-3 sm:gap-0 sm:items-stretch">
      <div className="color-grey min-w-[50%] text-center sm:text-left">
        Not correctly created tournaments can show wrong results
      </div>
      <div className="columns-2 flex justify-end min-w-[50%] gap-3">
        {isTournamentPaged ? (
          <>
          <img src={Dropdown} alt="back-icon" className="h-5 self-center rotate-90"/>
          <NavLink to={'/'} className="h-5 color-grey">
            back to tournaments page
          </NavLink>
          </>
        ) : (
          <>
          <img src={Search} alt="search-icon" className="h-4 self-center"/>
          <input type="text" placeholder="search by tournament name" onChange={({target}) => [setSearchPhrase(target.value), changeSearchPhrase()]} value={searchPhrase} className="bg-transparent outline-none border-b-2 placeholder:text-gray-custom border-gray-custom text-white text-center font-light pb-1 focus:text-zinc-100" />
          </>
        )}
      </div>
    </div>
  )
}
