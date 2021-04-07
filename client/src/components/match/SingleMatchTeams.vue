<template lang="pug">
  .teams__container
    .teams__container--red
        .teams__container__member(v-for="item in 5")
            .teams__container__member--avatar
                img(src="https://a.ppy.sh/5286213" alt="user_avatar")
            .teams__container__member--nickname
                ="Cookiezi"
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    ="#2"
                .teams__container__member--ranking--country
                    img(src="https://www.countryflags.io/pl/flat/64.png")
                    ="#1"
    .teams__container--blue
        .teams__container__member(v-for="item in 5")
            ='BLUE'
            br/
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class Teams extends Vue {
}
</script>

<style lang="sass">
.teams__container
    display: flex
    flex-wrap: wrap
    flex-direction: row
    height: 100%
    &__member
        align-self: space-between
        height: 50px
        background: rgba(0,0,0,.2)
        color: white
        font-weight: 800
        display: flex
        flex-direction: row
        align-items: center
        padding-left: 2.5px
        &--avatar
            max-height: 100%
            width: 45px
            flex-basis: 10%
        &--nickname
            flex-basis: 80%
            padding-left: 5px
        &--ranking
            display: flex
            flex-basis: 10%
            flex-direction: column
            &--global
                width: 100%
                text-align: center
            &--country
                display: flex
                flex-direction: row
                img
                    width: 45%
    &--red, &--blue
        flex-basis: 50%
        display: flex
        flex-direction: column
        justify-content: space-around
    &--red
        background: $team-red
        background: -webkit-linear-gradient(to left, $team-red, #ffffff)
        background: linear-gradient(to left, $team-red, #ffffff)
    &--blue
        background: $team-blue
        background: -webkit-linear-gradient(to right, $team-blue, #ffffff)
        background: linear-gradient(to right, $team-blue, #ffffff)

</style>
