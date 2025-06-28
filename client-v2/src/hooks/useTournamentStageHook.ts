import Player from "components/Player";
import usePlayerDetailsHook from "./usePlayerDetailsHook";
import useBeatmapHook from "./useBeatmapHook";

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
                    userId:    stage.user_id,
                    scores:    null,
                    mods:      null,
                    beatmap:   null,
                })
                break;
            case 'other':
                // map played... wtf is that name osuApi?
                const scores = stage.game.scores.map((score: BeatmapPlayerScore) => {
                    return {
                        beatmapId: stage.game.beatmap.id,
                        score:     score.score,
                        accuracy:  score.accuracy,
                        // TODO: FIX
                        //@ts-ignore 
                        combo:     score.max_combo,
                        perfect:   score.perfect,
                        mods:      score.mods,
                    }
                });

                console.log(stage)

                stagesAccepted.push({
                    stageType:  'map-played',
                    startTime:  stage.game.start_time,
                    endTime:    stage.game.end_time || null,
                    scores:     scores,
                    mods:       stage.game.mods,
                    beatmap:    useBeatmapHook({info: stage.game.beatmap})
                })
                break;
            default:
                // not implemented yet...
                break;
        }
    }));


    return stagesAccepted;
}