import Player from "components/Player";
import usePlayerDetailsHook from "./usePlayerDetailsHook";

interface TournamentStage {
    stageType: string,
    startTime: string;
    endTime: string | null;
    scores: BeatmapPlayerScore | null,
    mods: string[] | null,
    beatmap: Beatmap | null,
}

export default function useTournamentStageHook<T>(progress: Record<any, any>[]) {
    const stagesAccepted: TournamentStage[] = [];

    progress.forEach((stage => {
        switch (stage.detail.type) {
            case 'match-created':
            case 'match-disbanded':
                // find a judge, its a creator of a match
                // or a disbanded match
                stagesAccepted.push({
                    stageType: stage.detail.type,
                    startTime: stage.timestamp,
                    endTime:   stage.timestamp,
                    scores:    null,
                    mods:      null,
                    beatmap:   null,
                })
                break;
            case 'other':
                // map played... wtf is that name osuApi?
                const scores = stage.game.scores.map((score: BeatmapPlayerScore) => {
                    //@ts-ignore
                    const {playerDetails, loading, error} = usePlayerDetailsHook(score.user_id);

                    let player;
                    if (!loading && !error) {
                        player = playerDetails as Player;
                    }

                    return {
                        beatmapId: stage.game.beatmap.id,
                        score:     score.score,
                        accuracy:  score.accuracy,
                        // TODO: FIX
                        //@ts-ignore 
                        combo:     score.max_combo,
                        perfect:   score.perfect,
                        mods:      score.mods,
                        //@ts-ignore
                        player: playerDetails
                    }
                });


                stagesAccepted.push({
                    stageType:  'map-played',
                    startTime:  stage.game.startTime,
                    endTime:    stage.game.endTime || null,
                    scores:     scores,
                    mods:       stage.game.mods,
                    beatmap: {
                        id:         stage.game.beatmap.id,
                        title:      stage.game.beatmap.beatmapset.title,
                        artist:     stage.game.beatmap.beatmapset.artist,
                        creator:    stage.game.beatmap.beatmapset.creator,
                        difficulty: stage.game.beatmap.version,
                        mode:       stage.game.mode == 'osu' ? 'standard' : stage.game.mode,
                    },
                })
                break;
            default:
                // not implemented yet...
                break;
        }
    }));


    return stagesAccepted;
}