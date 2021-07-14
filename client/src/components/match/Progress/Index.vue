<template lang="pug">
  .progress__container
    md-steppers(md-vertical=true v-for="event in events")
        md-step(v-if="event.detail.type === 'match-created'" :md-description="getProperTime(event.timestamp)" md-label="Match created" md-done=true)
            ProgressMatchStarted(:judgeId="event.user_id")
        md-step(v-if="event.detail.type === 'other'"  md-label="Map played" :md-description="getProperTime(event.timestamp)" md-done=true)
            ProgressMatchWon(:maps="maps" :events="event" :areQualifiers="qualifiers")
        md-step(v-if="event.detail.type === 'match-disbanded'" md-label="End of the match" :md-description="getProperTime(event.timestamp)" md-done=true)
            ProgressMatchEnded(:matchInfo="maps" :areQualifiers="qualifiers")
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import dayjs from 'dayjs';
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

    @Prop() private areQualifiers!: boolean;

    events = this.progress;

    maps = this.mapsPlayed;

    qualifiers = this.areQualifiers;

    getProperTime = (timeString:string) :string => dayjs(timeString).format('DD/MM/YYYY HH:mm Z')
}
</script>

<style lang="sass">
.progress__container
    overflow-x: auto
    counter-reset: numbering
    max-height: 350px
/* Stepper icons change to numbers */
.md-button-content
    background: transparent !important
.md-stepper-number
    background: transparent !important
    &:before
        position: relative
        counter-increment: numbering
        content: " " counter(numbering) "."
        width: 100%
        color: $link-active
        background: transparent !important
        font-weight: 800
        font-size: 1.5em
        padding: 5px 5px
        right: 10px
        border-bottom: 2px solid $link-active
.md-icon
    svg
        display: none
</style>
