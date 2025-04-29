import Mode from '../Mode'

import { useModeSelectStore } from '../../stores/useModeSelect'

export default function Header() {
  const toggleMode = useModeSelectStore((state) => state.toggleMode)
  const modesSelected: Mode[] = useModeSelectStore(
    (state) => state.modesSelected
  )
  const isModeActive = (m: Mode) => modesSelected.includes(m)

  return (
    <div className="flex flex-row columns-2 w-full bg-container-main p-5 pt-4 px-8 mt-4 rounded-xl items-center">
      <h2 className="grow self-start">
        <span className="text-white text-4xl self-start">osu!</span>
        <span className="color-pink text-4xl">tc</span>
      </h2>
      <ul className="flex flex-row columns-4 gap-12 color-grey font-medium lowercase">
        {['osu', 'taiko', 'ctb', 'mania'].map((mode) => (
          <li
            className={
              'flex flex-row gap-2 items-center cursor-pointer  transition-colors duration-300 ease-in-out hover:text-pink-900 ' +
              (isModeActive(mode) ? 'text-pink-900' : '')
            }
            onClick={() => toggleMode(mode)}
            key={mode}
          >
            <Mode name={mode} />
          </li>
        ))}
      </ul>
    </div>
  )
}