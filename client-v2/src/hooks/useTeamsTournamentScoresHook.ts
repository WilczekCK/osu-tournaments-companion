export default function useTeamsTournamentScoresHook<T>(teams: Team[], mapsPlayed: Record<string, T>[]) {
    const teamBlue: TeamWithScore = {
        ...teams[0],
        score: 0,
        wins: 0,
        players: teams[0].players.map(player => ({ ...player, summaryScore: 0, summaryAccuracy: 0, scoreByBeatmap: [] }))
    };

    const teamRed: TeamWithScore = {
        ...teams[1],
        score: 0,
        wins: 0,
        players: teams[1].players.map(player => ({ ...player, summaryScore: 0, summaryAccuracy: 0, scoreByBeatmap: [] }))
    };

    // Function to assign scores to players and teams
    mapsPlayed.forEach((map: any) => {
        const { scores } = map;
        let summaryScoreBlue = 0;
        let summaryScoreRed = 0;

        scores.forEach((score: any) => {
            const { user_id, accuracy, score: playerScore, match } = score;

            const playerInBlue = teamBlue.players.find(player => player.id === user_id);
            const playerInRed = teamRed.players.find(player => player.id === user_id);

            if (playerInBlue) {
                summaryScoreBlue += playerScore;

                playerInBlue.summaryScore += playerScore;
                playerInBlue.summaryAccuracy += accuracy;
                playerInBlue.scoreByBeatmap.push({
                    userId: user_id,
                    beatmapId: 0,
                    score: playerScore,
                    accuracy,
                    combo: map.max_combo,
                    perfect: false,
                    mods: map.mods
                });
            } else if (playerInRed) {
                summaryScoreRed += playerScore;

                playerInRed.summaryScore += playerScore;
                playerInRed.summaryAccuracy += accuracy;
                playerInRed.scoreByBeatmap.push({
                    userId: user_id,
                    beatmapId: 0,
                    score: playerScore,
                    accuracy,
                    combo: map.max_combo,
                    perfect: false,
                    mods: map.mods
                });
            }
        });

        if (summaryScoreBlue > 0 || summaryScoreRed > 0) {
            teamBlue.score += summaryScoreBlue || 0;
            teamRed.score += summaryScoreRed || 0;

            // Assign wins to teams based on scores
            summaryScoreBlue > summaryScoreRed ? teamBlue.wins++ : teamRed.wins++;               
        }
    });


    return { teamBlue, teamRed };
}
