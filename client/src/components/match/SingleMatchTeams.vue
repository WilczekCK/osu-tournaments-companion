<template lang="pug">
  .teams__container
    .teams__container--blue
        .teams__container__member(v-for="item in 5" style="background:url('https://osu.ppy.sh/images/headers/profile-covers/c4.jpg')")
            .teams__container__member--avatar
                img(src="https://a.ppy.sh/5286213" alt="user_avatar")
            .teams__container__member--nickname
                ="Cookiezi"
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span="#2"
                .teams__container__member--ranking--country
                    img(src="https://www.countryflags.io/pl/flat/64.png")
                    span="#1"
    .teams__container--red
        .teams__container__member(v-for="item in 5" style="background:url('https://osu.ppy.sh/images/headers/profile-covers/c4.jpg')")
            .teams__container__member--avatar
                img(src="https://a.ppy.sh/5286213" alt="user_avatar")
            .teams__container__member--nickname
                ="Cookiezi"
            .teams__container__member--ranking
                .teams__container__member--ranking--global
                    span="#2"
                .teams__container__member--ranking--country
                    img(src="https://www.countryflags.io/pl/flat/64.png")
                    span="#1"
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
        color: white
        font-weight: 800
        display: flex
        flex-direction: row
        align-items: center
        padding-left: 10px
        background-position: center center
        &--avatar
            max-height: 100%
            width: 45px
            flex-basis: 10%
            z-index: 1
        &--nickname
            flex-basis: 75%
            padding-left: 5px
            z-index: 1
        &--ranking
            display: flex
            flex-basis: 15%
            flex-direction: column
            align-self: center
            transform: scale(.8)
            z-index: 1
            &--global
                width: 100%
                text-align: left
                font-size: 1.5em
                margin-left: .5px
            &--country
                display: flex
                flex-direction: row
                align-items: center
                justify-content: flex-start
                *
                    flex-basis: 50%
                img
                    width: 100%
                span
                    text-align: center
    &--red, &--blue
        flex-basis: 50%
        display: flex
        flex-direction: column
        justify-content: space-around
        background-blend-mode: blend
    &--red
        &
        &:after
            position: absolute
            content: ''
            width: 50%
            height: 100%
            background: rgba(255,0,0,0.2)
            z-index: 0
    &--blue
        &:after
            position: absolute
            content: ''
            width: 50%
            height: 100%
            background: rgba(0,0,255,0.2)
            z-index: 0
        flex-direction: column-reverse
        .teams__container__member
            flex-direction: row-reverse
            padding-left: unset
            padding-right: 10px
            &--nickname
                text-align: right
                padding-left: unset
                padding-right: 5px
            &--ranking
                &--global
                    text-align: right
                    margin-left: -2px
                &--country
                    flex-direction: row-reverse
</style>
