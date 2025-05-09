export default function MapInProgress({beatmap} : {beatmap: Beatmap}) {
    if (!beatmap) {
        return null;
    }

    console.log(beatmap.coverImg)


    return (
        <div className="relative w-[100%] h-24 flex flex-col">
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

            <div className="z-10 p-2 px-4 font-semibold">
                <a target="_blank" href={"https://osu.ppy.sh/b/"+beatmap.id+''}>
                    <div className="text-white underline underline-offset-2 text-xl">{beatmap.title}</div>
                    <div className="text-white text-regular">{beatmap.artist}</div>

                    <div className="mt-4 flex text-regular">
                        <div className="text-white pr-1">Map by: </div>
                        <div className="text-pink-900">{beatmap.creator}</div>
                    </div>
                </a>
            </div>
        </div>
    )
}