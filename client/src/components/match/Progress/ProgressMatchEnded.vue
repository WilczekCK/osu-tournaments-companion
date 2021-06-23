<template lang="pug">
    .progress__match__ended
        .progress__match__ended--finalText
            h2="Match won by the "
                b {{getWinnerOfTournament()}}
                =" team"
        .progress__match__ended--results
            h3="Summary scores:"
            = 'Blue: '
            b {{Number(sumScore.blue).toLocaleString()}}
            br
            = "Red: "
            b {{Number(sumScore.red).toLocaleString()}}

</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
    @Prop() private matchInfo!: any;

    beatmaps = this.matchInfo;

    sumScore = { red: 0, blue: 0 };

    sumPoints = { red: 0, blue: 0 };

    getSumScore = () :void => {
      this.beatmaps.forEach(({ summaryScore } : {summaryScore: any}) => {
        this.sumScore.blue += summaryScore.blue;
        this.sumScore.red += summaryScore.red;

        if (summaryScore.blue > summaryScore.red) this.sumPoints.blue += 1;
        if (summaryScore.blue < summaryScore.red) this.sumPoints.red += 1;
      });
    }

    getWinnerOfTournament = () :string => {
      if (this.sumPoints.blue > this.sumPoints.red) {
        return 'Blue';
      }

      return 'Red';
    }

    mounted() {
      this.getSumScore();
    }
}
</script>

<style lang="sass">
</style>
