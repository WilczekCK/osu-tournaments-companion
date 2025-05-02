export default function usePlayersHook<T>(tournamentPlayers: Record<string, T>[], judgeId: number) {
    // Get rid of judge and get necessary data
    const playersArray = tournamentPlayers.filter((player) => {
        return player.id != judgeId;
    }).map(player => {
        return {
            id: player.id,
            playerName: player.username,
            playerAvatar: player.avatar_url,
            playerCountry: player.country,
        } as Player;
    })

    return playersArray;
}