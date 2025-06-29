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

export default function useTournamentStageHook<T>(progress: Record<any, any>[], teams: Team[] = []): TournamentStage[] {
    const stagesAccepted: TournamentStage[] = [];

    const getWinBy = (scores: BeatmapPlayerScore[]) => {
        let teamBlue = 0;
        let teamRed = 0;

        scores.forEach((score) => {
            const isFromBlueTeam = teams[0].players.find(teamMember => score.user_id == teamMember.id );

            if (isFromBlueTeam) {
                teamBlue += score.score;
            } else {
                teamRed += score.score;
            }
        })

        return {diff: Math.abs(teamBlue-teamRed), teamName: teams[teamBlue > teamRed ? 0 : 1].name};
    }

    const getBestScores = (scores: BeatmapPlayerScore[]) => {
        const scoresSorted = scores.sort((a,b) => b.score - a.score);
        return scoresSorted.slice(0, 3);
    }

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

                stagesAccepted.push({
                    stageType:  'map-played',
                    startTime:  stage.game.start_time,
                    endTime:    stage.game.end_time || null,
                    scores:     scores,
                    mods:       stage.game.mods,
                    beatmap:    useBeatmapHook({info: stage.game.beatmap}),
                    winBy: stage.game.end_time ? getWinBy(stage.game.scores) : null,
                    topScores:  stage.game.end_time ? getBestScores(stage.game.scores) : null,
                })
                break;
            default:
                // not implemented yet...
                break;
        }
    }));


    return stagesAccepted;
}