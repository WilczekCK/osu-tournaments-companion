<template lang="pug">
  .progress__container
    md-steppers(md-vertical='true')
        md-step(md-label="Match created" :md-done="true")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won" :md-done="true")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="Y won" :md-done="true")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="Y won" :md-done="true")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won" :md-done="true")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won" :md-done="true")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won the match!" :md-done="true")
            p="Lorem ipsum dolor sit amet"
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
}
</script>

<style lang="sass">
.progress__container
    overflow-x: auto
    height: 100%
    counter-reset: numbering

/* Stepper icons change to numbers */
.md-stepper-number
    &:before
        position: relative
        counter-increment: numbering
        content: " " counter(numbering) " "
        width: 100%
        left: 35%
        color: white
        background-color: transparent !important
.md-icon
    svg
        display: none
</style>
