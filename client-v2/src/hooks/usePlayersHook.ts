export default function usePlayersHook<T>(tournamentPlayers: Record<string, T>[], judgeId: number) {
    // Get rid of judge and get necessary data
    const playersArray = tournamentPlayers.filter((player) => {
        if (tournamentPlayers.length <= 1) {
            return player;
        } else {
            return player.id != judgeId;
        }

    }).map(player => {
        return {
            id: player.id,
            playerName: player.username,
            playerAvatar: player.avatar_url,
            playerCountry: player.country,
            playerDetails: player.details ?? []
        } as Player;
    })

    return playersArray;
}