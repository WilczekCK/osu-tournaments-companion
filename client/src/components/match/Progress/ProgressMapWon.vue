<template lang="pug">
    .progress__map__container
        .progress__map__container__teamWon
            p
                b='xd'
                = ' team won by'
                b='lol'
        .progress__map__container__mapInfo
            h3="Map details"
            .progress__map__container__mapInfo__columnToRow
                .progress__map__container__mapInfo__image
                    img(src="https://assets.ppy.sh/beatmaps/385248/covers/list@2x.jpg?1521103183")
                .progress__map__container__mapInfo__description
                    .progress__map__container__mapInfo__description--creator
                        ="Map by: "
                        span {{ match.info.beatmapset.creator }}
                    .progress__map__container__mapInfo__description--artist
                        span {{ match.info.beatmapset.artist }}
                    .progress__map__container__mapInfo__description--title
                        span {{ match.info.beatmapset.title }}
                    .progress__map__container__mapInfo__description--difficulty
                        ="Difficulty: "
                        span {{ match.info.beatmapset.difficulty }}
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import _ from 'underscore';

@Component
export default class Progress extends Vue {
    @Prop() private matchInfo!: Record<string, unknown>;

    match = this.matchInfo;

    getWinnerAndScoreDifference = () :Record<any, any> => {
      console.log(_.keys(_.max(this.match.summaryScore)));
      return { winBy: 'lol', scoreDiff: _.max(this.match.summaryScore) - _.min(this.match.summaryScore) };
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
            &__columnToRow
                display: flex
                flex-direction: row
                @media (max-width: 768px)
                    flex-direction: column
            &__image
                flex-basis: 35%
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
