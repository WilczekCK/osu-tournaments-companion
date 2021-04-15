<template lang="pug">
    .progress__map__container
        .progress__map__container__teamWon
            p
                b {{ team.name }}
                = ' team won by'
                b= ' 400 points!'
        .progress__map__container__mapInfo
            h3="Map details"
            .progress__map__container__mapInfo__columnToRow
                .progress__map__container__mapInfo__image
                    img(src="https://assets.ppy.sh/beatmaps/385248/covers/list.jpg?1521103183")
                .progress__map__container__mapInfo__description
                    p {{ map.title }}
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
    @Prop() public team!: Record<string, unknown>;

    @Prop() public map!: Record<string, unknown>;

    teamWon = this.team;

    mapPlayed = this.map;
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
            &__columnToRow
                display: flex
                flex-direction: row
                &__image
                    flex-basis: 15%
                &__description
                    flex-basis: 77%
</style>
