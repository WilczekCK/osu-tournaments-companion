<template lang="pug">
    .navigation__container(class="md-layout md-gutter")
        .navigation__container--wrapper(class="md-layout-item md-layout")
            div(class="md-layout-item md-size-5")
            router-link(to="/" class="md-layout-item md-size-80 logo")
                ="osu!"
                span="tc"
            div(class="md-layout-item md-size-10 menu")
                a(href="https://discord.gg/hErbYQ6Fs9" target="_blank")
                    img(:src="require(`@/assets/discord.svg`)")
                a(href="https://github.com/wilczekck" target="_blank")
                    img(:src="require(`@/assets/github.svg`)")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default class NavBar extends Vue {
    name: 'test'

    isHamburgerActive = false
}
</script>

<style lang="sass">
.navigation__container
    width: 100%
    background: $bg-header
    height: 70px
    &--wrapper
        color: $icon-color !important
        height: 100%
        display: flex
        align-content: center
        .logo
            margin-left: 15px
        .menu
            a
                padding: 0px 5px
                &:hover
                    img
                        filter: invert(60%) sepia(10%) saturate(7310%) hue-rotate(299deg) brightness(102%) contrast(101%)
        a
            color: $link-color !important
            font-size: 48px
            margin-top: 5px
            span
                color: $link-active
            &:hover
                text-decoration: none
        img
            width: 30px
            height: 30px
</style>
