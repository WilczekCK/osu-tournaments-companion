import Player from "components/Player"
import usePlayersHook from '../../hooks/usePlayersHook'
import Icon from '../../assets/svg/stage-finish.svg';
import { formatDate } from "utils"

export default function MatchEnded({details, user, variant}) {    
    return (
        <div className="flex flex-row w-100 items-start gap-5">
            <div className={"bg-pink-900 p-2 rounded-full mt-3"}>
                <img 
                    src={Icon} 
                    alt={`icon-finish`} 
                    className={"h-4" } 
                />
            </div>

            <div className={"flex flex-col grow"}>
                <div className={"text-pink-900 text-lg mt-1"}>
                    Room has been closed
                </div>
                
                <div className={"text-gray-custom text-xs mt-[-5px] "+ (variant == 'white' ? 'text-white' : '')}>
                    {formatDate(details.startTime)}
                </div>
            </div>
        </div>
    )
}