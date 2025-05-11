export default function useTeamsShuffleHook<T>(players: Player[], teams: Record<string, T>[]) {
    const shuffledTeams: Team[] = [];
    let teamNames;

    let areQualifiers = (teams as any).areQualifiers;

    if ((teams as any).names.teamsName) {
        teamNames = (teams as any).names.teamsName;
    } else {
        teamNames = (teams as any).names;
    }


    if (areQualifiers) {
        const qualifiersTeam: Team = { players: [], name: '' };
        // let isSoloQualifierNameProper = players.length == 1 && players[0].playerName.toLowerCase() == teamNames.blue.toLowerCase();


        if (teamNames.blue.toLowerCase() != 'qualifiers') {
            // check the nickname because sometime the name is not in blue team.
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