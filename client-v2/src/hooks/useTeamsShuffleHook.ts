export default function useTeamsShuffleHook<T>(players: Player[], teams: Record<string, T>[]) {
    const areQualifiers = (teams as any).areQualifiers;
    const shuffledTeams: Team[] = [];
    let teamNames;

    if ((teams as any).names.teamsName) {
        teamNames = (teams as any).names.teamsName;
    } else {
        teamNames = (teams as any).names;
    }


    if (areQualifiers) {
        const qualifiersTeam: Team = { players: [], name: '' };

        if (teamNames.blue.toLowerCase() != 'qualifiers') {
            qualifiersTeam.name = teamNames.blue;
        } else {
            qualifiersTeam.name = teamNames.red;
        }


        qualifiersTeam.players = players;
        shuffledTeams.push(qualifiersTeam, { name: 'Qualifiers', players: [] });
    } else {
        const teamBlue: Team = { players: [], name: '' };
        const teamRed: Team = { players: [], name: '' };

        players.forEach((player) => {
            if ((teams as any).blue.includes(player.id)) {
                teamBlue.players.push(player);
            } else {
                teamRed.players.push(player);
            }
        })

        teamBlue.name = teamNames.blue;
        teamRed.name = teamNames.red;

        shuffledTeams.push(teamBlue, teamRed);
    }

    return shuffledTeams;
}