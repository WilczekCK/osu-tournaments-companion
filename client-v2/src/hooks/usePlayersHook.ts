
interface PlayerParams {
    player: number,
    playerName: string,
    playerAvatar: string,
    playerCountry: Record<string, string>,
}

export default function usePlayersHook<T>(tournamentPlayers: Record<string, T>[], judgeId: number) {
    // Get rid of judge and get necessary data
    const playersArray = tournamentPlayers.filter((player) => {
        return player.id != judgeId;
    }).map(player => {
        return {
            player: player.id,
            playerName: player.username,
            playerAvatar: player.avatar_url,
            playerCountry: player.country,
        } as PlayerParams;
    })

    return playersArray;
}