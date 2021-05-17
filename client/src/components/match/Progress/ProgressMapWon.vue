<template lang="pug">
    .progress__map__container
        .progress__map__container__single(v-if="map || map.info")
            .progress__map__container__teamWon
                p(v-if="winnerScoreDifference !== 0")
                    b {{winnerTeamName}}
                    = ' team won by '
                    b {{winnerScoreDifference}}
                p(v-else)
                    b="In progress..."
            .progress__map__container__mapInfo
                h3="Map details"
                .progress__map__container__mapInfo__columnToRow
                    .progress__map__container__mapInfo__image
                        a(:href="`https://osu.ppy.sh/b/${map.info.beatmapset.id}`" target="_blank")
                            img(:src="map.info.beatmapset.covers['list@2x']" alt="beatmap_image")
                    .progress__map__container__mapInfo__description
                        .progress__map__container__mapInfo__description--creator
                            ="Map by: "
                            span {{ map.info.beatmapset.creator }}
                        .progress__map__container__mapInfo__description--artist
                            a(:href="`https://osu.ppy.sh/b/${map.info.beatmapset.id}`" target="_blank") {{ map.info.beatmapset.artist }}
                        .progress__map__container__mapInfo__description--title
                            a(:href="`https://osu.ppy.sh/u/${map.info.beatmapset.id}`" target="_blank") {{ map.info.beatmapset.title }}
                        .progress__map__container__mapInfo__description--difficulty
                            ="Difficulty: "
                            span {{ map.info.version }}
        .progress__map__container__single(v-else)
            .progress__map__container__mapInfo__image
                .progress__map__container__mapInfo__image--missing
            .progress__map__container__mapInfo__description
                .progress__map__container__mapInfo__description--creator
                    ="Map by: "
                    span="Unknown"
                .progress__map__container__mapInfo__description--artist
                    span="Beatmap removed!"
                .progress__map__container__mapInfo__description--title
                    span="Unknown"
                .progress__map__container__mapInfo__description--difficulty
                    ="Difficulty: "
                    span='Unknown'
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import _ from 'underscore';
import axios from 'axios';

@Component
export default class Progress extends Vue {
    @Prop() public maps!: Record<string, Record<string, any>>;

    @Prop() public event!: Record<string, Record<string, any>>;

    mapList = this.maps;

    mapId = this.event.game.beatmap.id;

    map = {};

    winnerTeamName = '';

    winnerScoreDifference = 0;

    setWinnerTeamName(summaryScore) :void {
      function getBiggestScore(score) {
        if (score === _.max(summaryScore)) return true;
        return false;
      }

      this.winnerTeamName = _.findKey(summaryScore, getBiggestScore);
    }

    async created() {
      let mapLoaded:any = {};

      this.mapList.forEach((map) => {
        if (map.info && map.info.id === this.mapId) {
          mapLoaded = map;
        }
      });

      this.map = mapLoaded;
      this.winnerScoreDifference = _.max(mapLoaded.summaryScore) - _.min(mapLoaded.summaryScore);
      this.setWinnerTeamName(mapLoaded.summaryScore);
    }
}
</script>

<style lang="sass">
    .progress__map__container
        display: flex
        flex-direction: column
        &__teamWon
            font-size: 1.5em
            p
                &:first-letter
                    text-transform: uppercase
        &__mapInfo
            margin-top: -25px
            h3
                border-bottom: 2px solid $link-active
                font-weight: 400
                padding-bottom: 5px
            a
                color: inherit !important
                text-decoration: none !important
            &__columnToRow
                display: flex
                flex-direction: row
                @media (max-width: 768px)
                    flex-direction: column
            &__image
                flex-basis: 35%
                &--missing
                    display: flex
                    font-size: 4em
                    height: 100%
                    width: 95%
                    justify-content: center
                    align-items: center
                    background: rgba(0,0,0,.5)
                @media (max-width: 768px)
                    flex-basis: 100%
            &__description
                width: 100%
                display: flex
                flex-direction: row
                flex-wrap: wrap
                align-self: center
                &--creator
                    font-size: .8em
                &--artist
                    font-size: 1.25em
                    font-weight: 600
                    flex-basis: 100%
                &--title
                    font-size: 1.1em
                    font-weight: 600
                    flex-basis: 100%
                &--difficulty
                    span
                        font-weight: 600
</style>
