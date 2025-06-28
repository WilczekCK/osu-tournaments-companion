import Player from "components/Player"
import usePlayersHook from '../../hooks/usePlayersHook'
import Icon from '../../assets/svg/stage-start.svg';

export default function MatchCreated({details, user}) {
    return (
        <div className="flex flex-row w-100 items-start gap-5">
            <div className={"bg-pink-900 p-1 rounded-full mt-2"}>
                <img 
                    src={Icon} 
                    alt={`icon-start`} 
                    className={"h-6" } 
                />
            </div>

            <div className={"flex flex-col grow"}>
                <div className={"text-pink-900 text-lg"}>
                    Match created:
                </div>
                
                <div className={"text-gray-custom text-xs mt-[-5px]"}>
                    {details.startTime}
                </div>

                {user && (
                    <div className="mt-2">
                        <div class="text-base mb-1">Owner:</div>
                        <Player player={usePlayersHook([user], 0)[0]} team={0}/>
                    </div>
                )}
            </div>
        </div>
    )
}