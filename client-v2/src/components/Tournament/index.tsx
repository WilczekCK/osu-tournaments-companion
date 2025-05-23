import { useState } from 'react'
import dayjs from 'dayjs'

import Dropdown from '../../assets/svg/dropdown.svg'

import Mode from 'components/Mode'
import TeamsList from 'components/TeamsList'
import MapInProgress from './MapInProgress'

import usePlayersHook from 'hooks/usePlayersHook'
import useTeamsShuffleHook from 'hooks/useTeamsShuffleHook'
import useTeamsTournamentScoresHook from 'hooks/useTeamsTournamentScoresHook'
import useBeatmapHook from 'hooks/useBeatmapHook'
import InformationSwitchMenu from './InformationSwitchMenu'

export default function Tournament({tournament}) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayContent, setDisplayContent] = useState('players');

  const mapInProgress = useBeatmapHook(tournament.mapsPlayed[tournament.mapsPlayed.length - 1]);
  const players = usePlayersHook(tournament.users, tournament.judge);
  const teams   = useTeamsShuffleHook(players, tournament.teams);
  const {teamBlue, teamRed} = useTeamsTournamentScoresHook(teams, tournament.mapsPlayed);

  return (
    <>
      <div className="flex flex-col w-full rounded-xl items-center bg-container-tournament relative">
        {(!tournament.timeEnded && mapInProgress) && (
          <MapInProgress beatmap={mapInProgress} />
        )}

        <div className="flex flex-row columns-2 w-full items-center gap-3 py-4 px-2 pt-3">
          <Mode name={tournament.gameMode} displayText={false} />
          <div className="flex flex-col gap-0 items-start text-white text-sm grow">
            <div className="text-pink-900 font-semibold text-lg">{tournament.titleFlattened}</div>

            <div className="mt-[-5px] flex flex-row gap-1">
              { 
                tournament.areQualifiers 
                  ? `Qualifiers: (${teams[0].name})` 
                  : (
                    <>
                      {teamBlue.wins > teamRed.wins 
                        ? (
                          <>
                            <div>({teamBlue.name}) {teamBlue.wins}</div> : <div className="text-gray-400">{teamRed.wins} ({teamRed.name})</div>
                          </>
                        ) : (
                          <>
                            <div className="text-gray-400">({teamBlue.name}) {teamBlue.wins}</div> : <div>{teamRed.wins} ({teamRed.name})</div>
                          </>
                        )}
                    </>
                  )
              }
            </div>

            <div className="mt-[-2.5px]">
              {
                tournament.timeEnded && tournament.timeEnded.trim() !== ''
                  ? (`Finished: ${dayjs(tournament.timeEnded).format('YYYY-MM-DD HH:ss')}`)
                  : (`Started: ${dayjs(tournament.timeCreated).format('YYYY-MM-DD HH:ss')}`)
              }
            </div>
          </div>
          <a target="_blank" href={"https://osu.ppy.sh/community/matches/"+ tournament.id} className="text-xs cursor-pointer rounded-full border border-pink-custom bg-transparent p-1 pb-2 hover:bg-pink-custom transition duration-300 ease-in-out text-pink-custom hover:text-white">
            osu!
          </a>
          <a target="_blank" href="#" className="text-xs cursor-pointer rounded-full border border-pink-custom bg-transparent p-1 pb-2 hover:bg-pink-custom transition duration-300 ease-in-out  text-pink-custom hover:text-white">
            otc!
          </a>
          <img
            src={Dropdown}
            alt="dropdown-icon"
            className={"max-h-10 cursor-pointer "+ (isOpen ? 'rotate-180' : '')}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        <div
          className={`transition-[max-height] duration-300 ease-in-out overflow-hidden gap-2 w-full items-start text-white text-sm relative flex flex-row ${
            isOpen ? 'max-h-[300px] py-2 px-2 overflow-scroll' : 'max-h-0 '
          }`}
        >
          {displayContent === 'players' && (
            <TeamsList teams={teams}/>
          )}
          {displayContent === 'matches' && (
            <>Progre</>
          )}
        </div>


        {isOpen && (
          <InformationSwitchMenu 
            displayContent={displayContent}
            setDisplayContent={(content) => setDisplayContent(content)}
          />
        )}

      </div>
    </>
  )
}
