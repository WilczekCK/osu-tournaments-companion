import { shortenString } from "utils";

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

        

        if (!teamNames.blue.toLowerCase().includes('qualifiers', 'tryouts')) {
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
            const normalizeStr = (str: string) => str.toLowerCase().replace(/[\s\W_]+/g, '');
            const isPlayerNameBlueTeam = normalizeStr(player.playerName) === normalizeStr(teamNames.blue);
            const isPlayerNameRedTeam  = normalizeStr(player.playerName) === normalizeStr(teamNames.red);

            if (isPlayerNameBlueTeam || isPlayerNameRedTeam) {
                // 1v1, but not selected color teams in room 
                if (isPlayerNameBlueTeam) {
                    teamBlue.players.push(player);
                } else if (isPlayerNameRedTeam) {
                    teamRed.players.push(player);
                }
            } else {
                // Regular teams
                if ((teams as any).blue.includes(player.id)) {
                    teamBlue.players.push(player);
                } else {
                    teamRed.players.push(player);
                }
            }
        })

        teamBlue.name = shortenString(teamNames.blue, 30);
        teamRed.name = shortenString(teamNames.red, 30);

        

        shuffledTeams.push(teamBlue, teamRed);
    }

    return shuffledTeams;
}