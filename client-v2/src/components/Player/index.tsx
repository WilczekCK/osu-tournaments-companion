import { useEffect, useState } from "react";
import axios from "axios";
import Mode from "components/Mode";
import Avatar  from "./Avatar";

export default function Player({player, withRanking = false, teamNumber} : {player: Player, withRanking?: boolean, teamNumber: number}) {
    return (
        <a href={`https://osu.ppy.sh/u/${player.id}`}  target="_blank" className={"min-w-[100%] flex flex-row gap-3 items-center relative text-white cursor-pointer text-lg shadow-red-500/50 inset-shadow-2xs z-10"}>
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-gradient-to-r from-black to-transparent"
                    style={{
                        backgroundImage: player.playerDetails.coverUrl
                            ? `linear-gradient(to ${(teamNumber == 0 ? 'left' : 'right')}, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${player.playerDetails.coverUrl})`
                            : `linear-gradient(to ${(teamNumber == 0 ? 'left' : 'right')}, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
            </div>
            <div className={"z-10 flex flex-row min-w-[100%] py-1 px-2 items-center gap-2 text-base " + (teamNumber == 0 ? 'sm:flex-row-reverse' : 'sm:flex-row')}>
                <Avatar player={player} />
                <div className="flex">
                    {player.playerName.length > 10 ? `${player.playerName.slice(0, 10)}...` : player.playerName}
                </div>
                {withRanking && (
                    <div className={"flex-col flex grow gap-0 items-end sm:items-stretch"}>
                        <span className={"text-zinc-300 flex flex-row-reverse sm:flex-row gap-1 items-center text-base " + (teamNumber == 0 ? 'ml-[-1px]' : 'sm:flex-row-reverse mr-[-2px]')}>
                            <Mode name={player.playerDetails.gameMode} displayText={false} size={'20px'} />
                            #{player.playerDetails.ranking?.global}
                        </span>
                        <span className={"text-zinc-300 flex flex-row-reverse sm:flex-row gap-1 items-center text-base " + (teamNumber == 0 ? 'sm:flex-row' : 'sm:flex-row-reverse')}>
                            <img src={`https://flagcdn.com/${player.playerDetails.country?.code.toLowerCase()}.svg`} width="20" className={'max-h-[15px]'} />
                            #{player.playerDetails.ranking?.country}
                        </span>
                    </div>
                )}
            </div>
        </a>
    );
}