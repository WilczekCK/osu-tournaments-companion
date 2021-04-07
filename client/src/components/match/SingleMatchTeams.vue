<template lang="pug">
  .teams__container
    .teams__container--red
        .teams__container__member(v-for="item in 5")
            ='RED'
            br/
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
        color: black
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
