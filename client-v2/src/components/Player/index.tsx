import { useEffect, useState } from "react";
import axios from "axios";
import Mode from "components/Mode";
import Avatar  from "./Avatar";

export default function Player({player, withRanking = false, teamNumber} : {player: Player, withRanking?: boolean, teamNumber: number}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [playerDetails, setPlayerDetails] = useState({});

    useEffect(() => {
        if (withRanking) {
            axios
                .get(`https://api.otc.glad.vision/users/${player.id}`)
                .then((response) => {
                    setPlayerDetails(response.data.result[0]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching user:", error);
                    setError(true);
                    setLoading(false);
                });
        }
    }, [withRanking, player.id]);

    return (
        <a href={`https://osu.ppy.sh/u/${player.id}`}  target="_blank" className={"min-w-[100%] flex flex-row gap-3 items-center relative text-white cursor-pointer text-lg shadow-red-500/50 inset-shadow-2xs z-10"}>
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-gradient-to-r from-black to-transparent"
                    style={{
                        backgroundImage: playerDetails.coverUrl
                            ? `linear-gradient(to ${(teamNumber == 0 ? 'left' : 'right')}, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(${playerDetails.coverUrl})`
                            : `linear-gradient(to ${(teamNumber == 0 ? 'left' : 'right')}, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
            </div>
            <div className={"z-10 flex flex-row min-w-[100%] py-1 px-2 items-center gap-2 text-base " + (teamNumber == 0 ? 'flex-row-reverse' : 'flex-row')}>
                <Avatar player={player} />
                <div className="flex">
                    {player.playerName.length > 10 ? `${player.playerName.slice(0, 10)}...` : player.playerName}
                </div>
                {withRanking && (
                    (!loading && !error) && (
                        <div className={"flex flex-col grow gap-1 " + (teamNumber == 0 ? 'items-start' : 'items-end')}>
                            <span className={"text-zinc-300 flex flex-row gap-1 items-center text-base " + (teamNumber == 0 ? 'flex-row' : 'flex-row-reverse')}>
                                <Mode name={playerDetails.gameMode} displayText={false} size={'20px'} />
                                #{playerDetails.ranking?.global}
                            </span>
                            <span className={"text-zinc-300 flex flex-row gap-2 mt-[-5px] items-center text-base " + (teamNumber == 0 ? 'flex-row' : 'flex-row-reverse')}>
                                <img src={`https://flagcdn.com/${playerDetails.country?.code.toLowerCase()}.svg`} width="20" className={'max-h-[15px]'} />
                                #{playerDetails.ranking?.country}
                            </span>
                        </div>
                    )
                )}
            </div>
        </a>
    );
}