import Mode from '../Mode'
import Subheader from './Subheader'
import { useModeSelectStore } from '../../stores/useModeSelectStore'
import { useTournamentsStore } from 'stores/useTournamentsStore'
import { useLoadMoreStore } from 'stores/useLoadMoreStore'
import { useSearchStore } from 'stores/useSearchStore'

export default function Header() {
  const toggleMode = useModeSelectStore((state) => state.toggleMode)
  const modesSelected: Mode[] = useModeSelectStore(
    (state) => state.modesSelected
  )
  const isModeActive = (m: Mode) => modesSelected.includes(m)

  // search input
  const setSearchPhrase  = useSearchStore((state) => state.setPhrase);

  // tournaments list
  const clearTournaments = useTournamentsStore((state) => state.clearTournaments);
  const loadTournaments = useTournamentsStore((state) => state.loadTournaments);
  const setToggleLoad = useLoadMoreStore((state) => state.setToggle);

  return (
    <>
      <div className="flex flex-col sm:flex-row columns-1 sm:columns-2 w-full bg-container-main p-5 pt-4 px-8 mt-4 rounded-xl items-center select-none gap-4 sm:gap-0">
        <h2 className="grow self-center sm:self-start">
          <span className="text-white text-4xl self-start">osu!</span>
          <span className="color-pink text-4xl">tc</span>
        </h2>
        <ul className="flex flex-row columns-4 gap-6 sm:gap-12 color-grey font-medium lowercase">
          {['osu', 'taiko', 'fruits', 'mania'].map((mode) => (
            <li
              className={
                'flex flex-col sm:flex-row gap-2 items-center cursor-pointer  transition-colors duration-300 ease-in-out hover:text-pink-900 ' +
                (isModeActive(mode) ? 'text-pink-900' : '')
              }
              onClick={() => [toggleMode(mode), clearTournaments(), setSearchPhrase(''), loadTournaments(4)]}
              key={mode}
            >
              <Mode name={mode} />
            </li>
          ))}
        </ul>
      </div>

      <Subheader />
    </>
  )
}