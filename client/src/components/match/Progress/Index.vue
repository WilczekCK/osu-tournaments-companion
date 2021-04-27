<template lang="pug">
  .progress__container
    md-steppers(md-vertical=true v-for="event in events")
        md-step(v-if="event.detail.type === 'match-created'" :md-description="event.timestamp" md-label="Match created" md-done=true)
            ProgressMatchStarted(:judgeId="event.user_id")
        md-step(v-if="event.detail.type === 'other'"  md-label="somebody wins - todo later" :md-description="event.timeStamp" md-done=true)
            ProgressMatchWon(:matchInfo="getMapInfo()")
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
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
    @Prop() private progress!: Array<Record<string, unknown>>;

    @Prop() private mapsPlayed!: Array<Record<string, unknown>>;

    events = this.progress;

    maps = this.mapsPlayed;

    // it includes summary scores and map info
    getMapInfo = () :Record<string, unknown> => this.maps.shift();
}
</script>

<style lang="sass">
.progress__container
    overflow-x: auto
    height: 100%
    counter-reset: numbering
    max-height: 350px
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
