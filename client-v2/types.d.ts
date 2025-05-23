type Mode = 'standard' | 'taiko' | 'ctb' | 'mania'

type Player = {
    id: number,
    playerName: string,
    playerAvatar: string,
    playerCountry: Record<string, string>,
}
interface PlayerDetails extends Player {
    playerRankCountry: number,
    playerRankGlobal: number,
}

interface PlayerWithScore extends Player {
    summaryScore: number,
    summaryAccuracy: number,
    scoreByBeatmap: BeatmapPlayerScore[]
}

interface Team {
    players: Player[],
    name: string,
}

interface TeamWithScore extends Team {
    score: number,
    wins: number,
    players: PlayerWithScore[]
}

interface Beatmap {
    id: number,
    title: string,
    artist: string,
    creator: string,
    difficulty: string,
    mode: Mode,
}

interface BeatmapPlayerScore {
    userId: number | null,
    beatmapId: number,
    score: number,
    accuracy: number,
    combo: number,
    perfect: boolean,
    mods: string,
}