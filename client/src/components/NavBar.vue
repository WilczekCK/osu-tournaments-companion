<template lang="pug">
    .navigation__container(class="md-layout md-alignment-center-center")
        .md-layout-item(class="md-size-10")
        .navigation__container--wrapper(class="md-layout-item md-layout md-gutter")
            router-link(to="/" class="md-layout-item md-size-77")
                ="osu!"
                span="tc"
            div(class="md-layout-item md-size-33 md-layout md-aligment-center-center")
                 md-menu(md-size="medium" md-align-trigger @md-closed="isHamburgerActive = false" @md-opened="isHamburgerActive = true")
                    md-button(md-menu-trigger)
                        span(class="material-icons md-layout-item" v-if="!isHamburgerActive")
                            ="menu"
                        span(class="material-icons md-layout-item" v-else)
                            ="menu_open"
                    md-menu-content
                        md-menu-item
                            router-link(to="#")
                                ="About osu!tc"
                        md-menu-item
                            a(href="https://osupoli.pl")
                                ="OsuPoli"
                        md-menu-item
                            a(href="#")
                                ="Discord"
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
    isHamburgerActive = false
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        a
            color: $link-color !important
            font-size: 48px
            margin-top: 5px
            span
                color: $link-active
            &:hover
                text-decoration: none
        .md-menu
            margin: 0 auto
            &:hover
                cursor: pointer
            span
                color: $link-color
.md-list
    .md-menu-item
        padding: 5px 10px
        a
            color: $bg-content
            font-weight: 600
            &:hover
                color: $link-active
                text-decoration: none
</style>
