import { shortenString } from "utils"

export default function MapInProgress({beatmap} : {beatmap: Beatmap}) {
    return (
        <div className="relative w-[100%] h-36 sm:h-24 flex flex-col justify-center sm:justify-start">
            <div className="absolute inset-0 z-0">
                <div
                    className="h-full w-full bg-gradient-to-r from-black to-transparent z-0"
                    style={{
                        backgroundImage: beatmap.coverImg
                            ? `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${beatmap.coverImg})`
                            : `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5))`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "10px 10px 0px 0px"
                    }}
                ></div>
            </div>

            <div className="z-10 p-2 px-3 font-semibold mt-[-10px] sm:mt-0">
                <a className={"flex flex-col sm:flex-row gap-2 sm:gap-0 items-center sm:items-stretch"} target="_blank" href={"https://osu.ppy.sh/b/"+beatmap.id+''}>
                    <div className={"grow items-center flex flex-col sm:block"}>
                        <div className="text-white underline underline-offset-2 text-xl">{shortenString(beatmap.title, 30)}</div>
                        <div className="text-white text-regular">{shortenString(beatmap.artist, 45)}</div>

                        <div className="mt-4 flex text-regular">
                            <div className="text-white pr-1">Map by: </div>
                            <div className="text-pink-900">{shortenString(beatmap.creator, 20)}</div>
                        </div>
                    </div>

                    <div className={"flex flex-col items-end justify-start text-white"}>
                        <div>
                            Difficulty: <strong>{shortenString(beatmap.difficulty, 25)}</strong>
                        </div>
                        

                        <div className={"absolute bottom-2 text-white bg-red-700 p-2 w-min hidden sm:flex"}>
                            LIVE
                        </div>
                    </div>

                </a>
            </div>
        </div>
    )
}