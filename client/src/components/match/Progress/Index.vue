<template lang="pug">
  .progress__container
    md-steppers(md-vertical='true')
        md-step(md-label="Match created" md-description!="2021-03-30 at 08:34" md-done="true")
            ProgressMatchStarted
        md-step(md-label="X won" md-description!="2021-03-30 at 08:34" md-done="true")
            ProgressMatchWon(:team={name:'blue'} :map={title:'Big Black', artist:'The quick brown fox', difficulty: 'Holy', creator:'val0108', covers:[], preview_url: '//b.ppy.sh/preview/385248.mp3'})
        md-step(md-label="Y won" md-description!="2021-03-30 at 08:45" md-done="true")
            ProgressMatchWon(:team={name:'blue'} :map={title:'Big Black', artist:'The quick brown fox', difficulty: 'Holy', creator:'val0108', covers:[], preview_url: '//b.ppy.sh/preview/385248.mp3'})
        md-step(md-label="Y won" md-description!="2021-03-30 at 08:57" md-done="true")
            ProgressMatchWon(:team={name:'blue'} :map={title:'Big Black', artist:'The quick brown fox', difficulty: 'Holy', creator:'val0108', covers:[], preview_url: '//b.ppy.sh/preview/385248.mp3'})
        md-step(md-label="X won" md-description!="2021-03-30 at 09:02" md-done="true")
            ProgressMatchWon(:team={name:'blue'} :map={title:'Big Black', artist:'The quick brown fox', difficulty: 'Holy', creator:'val0108', covers:[], preview_url: '//b.ppy.sh/preview/385248.mp3'})
        md-step(md-label="X won" md-description!="2021-03-30 at 09:10" md-done="true")
            ProgressMatchWon(:team={name:'blue'} :map={title:'Big Black', artist:'The quick brown fox', difficulty: 'Holy', creator:'val0108', covers:[], preview_url: '//b.ppy.sh/preview/385248.mp3'})
        md-step(md-label="X won the match!" md-description!="2021-03-30 at 09:15" md-done="true")
            ProgressMatchEnded(:team={name: blue} :results={blue: 5, red: 2})
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProgressMatchWon from './ProgressMapWon.vue';
import ProgressMatchEnded from './ProgressMatchEnded.vue';
import ProgressMatchStarted from './ProgressMatchStarted.vue';

@Component({
  components: {
    ProgressMatchWon,
    ProgressMatchEnded,
    ProgressMatchStarted,
  },
})
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
