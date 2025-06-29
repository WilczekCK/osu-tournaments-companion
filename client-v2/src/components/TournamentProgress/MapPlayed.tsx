import Player from "../../components/Player"
import usePlayersHook from '../../hooks/usePlayersHook'
import Icon from '../../assets/svg/stage-match.svg';
import { shortenString, formatDate } from "utils"

export default function MapPlayed({details, users, teams}) {
    const beatmap = details.beatmap || {};
    const areQualifiers = teams[0].name === 'Qualifiers' || teams[1].name === 'Qualifiers';

    const findUser = (userId) => {
        return users.find(user => user.details.id === userId) || null;
    }

    return (
        <div className="flex flex-row w-100 items-start gap-5">
            <div className={"bg-pink-900 p-1 rounded-full mt-3"}>
                {details.endTime 
                    ? ( <img src={Icon} alt={`icon-match`} className={"h-6" } />) 
                    : ( <div className="animate-spin h-4 w-4 p-2 border-4 border-white-0 border-t-transparent rounded-full"></div>)
                }

            </div>

            <div className={"flex flex-col grow"}>
                <div className={"text-pink-900 text-lg mt-2"}>
                    {!details.endTime ? "Currently played map" : "Map played"}
                </div>
                
                <div className={"text-gray-custom text-xs mt-[-5px]"}>
                    {formatDate(details.startTime)}
                </div>


                <div className={"mt-3"}>
                    {details.beatmap && (
                        <div className="relative w-[100%] h-24 flex flex-col">
                        <div className="absolute inset-0 z-0">
                            <div
                                className="h-full w-full bg-gradient-to-r from-black to-transparent z-0"
                                style={{
                                    backgroundImage: beatmap.coverImg
                                        ? `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${details.beatmap.coverImg})`
                                        : `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: "5px"
                                }}
                            ></div>
                        </div>

                        <div className="z-10 p-1 px-3 font-semibold">
                            <a className={"flex flex-row"} target="_blank" href={"https://osu.ppy.sh/b/"+details.beatmap.id+''}>
                                <div className={"grow"}>
                                    <div className="text-white underline underline-offset-2 text-xl">{shortenString(beatmap.title, 30)}</div>
                                    <div className="text-white text-regular">{shortenString(beatmap.artist, 45)}</div>

                                    <div className="mt-4 flex text-regular">
                                        <div className="text-white pr-1">Map by: </div>
                                        <div className="text-pink-900">{shortenString(beatmap.creator, 20)}</div>
                                    </div>
                                </div>

                                <div className={"flex flex-col items-end justify-start text-white"}>
                                    <div>
                                        Difficulty: <strong>{shortenString(beatmap.difficulty, 20)}</strong>
                                    </div>
                                </div>

                            </a>
                        </div>
                    </div>
                    )}
                </div>


                <div className="flex flex-col gap-2">
                    {details.endTime && (
                        areQualifiers ? (
                            <div className={"text-base mt-2"}>
                                Score achieved: {new Intl.NumberFormat().format(details.winBy.diff)}
                            </div>
                        ) : (
                            <div className={"text-base mt-2"}>
                                Won by <b className={"text-pink-900"}>{details.winBy.teamName}</b> with <b>{new Intl.NumberFormat().format(details.winBy.diff)}</b> score difference
                            </div>
                        )
                    )}

                    {details.endTime && (
                        <>
                            <div className={"text-base"}>Best scores by:</div>
                            {Array.isArray(details.topScores) && details.topScores.map((score, index) => (
                                <div key={index} className={"text-gray-custom text-sm flex flex-row items-center"}>
                                    <div className="grow">{<Player player={usePlayersHook([findUser(score.user_id)])[0]} team={score.match.team == 'red' ? 1 : 0} withRanking={true}/> }</div>
                                    <div className={"min-w-[125px] text-center text-white text-xl flex flex-col mt-[-5px]"}>
                                        {new Intl.NumberFormat().format(score.score)}

                                        <div className={"text-gray-custom text-xs"}>
                                            <div>
                                                {(score.accuracy * 100).toFixed(2) + '%'}  / {score.max_combo && score.max_combo + 'x'}  
                                            </div>

                                            {Array.isArray(score.mods) && score.mods.length > 0 && (
                                                <span className=" text-pink-custom">
                                                    {score.mods.map((mod, modIndex) => (
                                                        <span key={modIndex} className="mr-1 ">{mod}</span>
                                                    ))}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                
                <div>
                </div>
            </div>
        </div>
    )
}