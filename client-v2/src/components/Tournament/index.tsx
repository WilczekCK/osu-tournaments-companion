import Mode from 'components/Mode'
import Dropdown from '../../assets/svg/dropdown.svg'
import { useState } from 'react'
import usePlayersHook from 'hooks/usePlayersHook'
import useTeamsShuffleHook from 'hooks/useTeamsShuffleHook'

export default function Tournament({tournament}) {
  const [isOpen, setIsOpen] = useState(false);

  const players = usePlayersHook(tournament.users, tournament.judge);
  const teams   = useTeamsShuffleHook(players, tournament.teams);

  console.log(teams);

  return (
    <>
      <div className="flex flex-col w-full px-4 rounded-xl items-center bg-container-tournament max-w-xl">
        <div className="flex flex-row columns-2 w-full items-center gap-3 py-4">
          <Mode name={tournament.gameMode} displayText={false} />
          <div className="flex flex-col gap-0 items-start text-white text-sm grow">
            <div className="text-pink-900 font-semibold text-lg">{tournament.titleFlattened}</div>
            <div className="mt-[-5px]">
              {/* ({teams[0].name}) {teams[0].score} : {teams[1].score} ({teams[1].name}) */}
            </div>
            <div className="mt-[-2.5px]">Started: {tournament.timeCreated}</div>
          </div>
          <img
            src={Dropdown}
            alt="dropdown-icon"
            className={"max-h-10 cursor-pointer"+ (isOpen ? ' rotate-180' : '')}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden flex flex-col gap-2 w-full items-start text-white text-sm ${
            isOpen ? 'max-h-[300px]' : 'max-h-0 '
          }`}
        >
          <div>Additional Info</div>
        </div>
      </div>
    </>
  )
}
