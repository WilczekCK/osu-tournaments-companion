<template lang="pug">
    .progress__map__container
        .progress__map__container__teamWon
            p
                b='xd'
                = ' team won by '
                b {{getWinnerScoreDifference()}}
        .progress__map__container__mapInfo
            h3="Map details"
            .progress__map__container__mapInfo__columnToRow
                .progress__map__container__mapInfo__image
                    img(:src="match.info.beatmapset.covers['list@2x']" v-if="match.info")
                    .progress__map__container__mapInfo__image--missing(v-else)="?"
                .progress__map__container__mapInfo__description
                    .progress__map__container__mapInfo__description--creator
                        ="Map by: "
                        span(v-if="match.info") {{ match.info.beatmapset.creator }}
                        span(v-else)="Unknown"
                    .progress__map__container__mapInfo__description--artist
                        span(v-if="match.info") {{ match.info.beatmapset.artist }}
                        span(v-else)="Beatmap removed!"
                    .progress__map__container__mapInfo__description--title
                        span(v-if="match.info") {{ match.info.beatmapset.title }}
                        span(v-else)="Unknown"
                    .progress__map__container__mapInfo__description--difficulty
                        ="Difficulty: "
                        span(v-if="match.info") {{ match.info.version }}
                        span(v-else)='Unknown'
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import _ from 'underscore';

@Component
export default class Progress extends Vue {
    @Prop() public matchInfo!: Record<string, unknown>;

    match = this.matchInfo;

    getWinnerScoreDifference = () :number => _.max(this.match.summaryScore) - _.min(this.match.summaryScore);
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
