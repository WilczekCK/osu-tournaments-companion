export default function useBeatmapHook(beatmap: Record<string, any>) {
    if (!beatmap) {
        return false;
    }

   return {
      id: beatmap.info.id,
      title: beatmap.info.beatmapset.title,
      artist: beatmap.info.beatmapset.artist,
      creator: beatmap.info.beatmapset.creator,     
      difficulty: beatmap.info.version,
      coverImg: beatmap.info.beatmapset.covers.cover,
   }
}