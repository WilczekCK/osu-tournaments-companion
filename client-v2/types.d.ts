type Mode = 'standard' | 'taiko' | 'ctb' | 'mania'
type Player = {
    id: number,
    playerName: string,
    playerAvatar: string,
    playerCountry: Record<string, string>,
}