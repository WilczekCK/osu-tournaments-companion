<template lang="pug">
    md-card
        md-card-media
            img(:src="require(`@/assets/${getGamemode()}.svg`)")
        md-card-header
            .md-title
                a(:href="getLinkToOsuPage()" target="_blank")
                    span {{tournamentInfo.title}}
            .md-subtitle
                span(v-if="tournamentInfo.timeEnded")
                    ="Ended at: "
                    span {{tournamentInfo.timeEnded}}
                span(v-else)
                    ='In progres...'
        md-card-expand
            .md-score
                p {{getFinishScore()}}
            md-card-actions(md-aligment="space-between")
                md-card-expand-trigger
                    md-button(class="md-mini")
                        span(class="material-icons md-layout-item")
                            ="keyboard_arrow_down"
        md-card-expand-content
            md-card-content
                .match__container
                    md-tabs(md-alignment="fixed")
                        md-tab(id="tab-teams" md-label="teams")
                            SingleMatchTeams(:teams="tournamentInfo.teams")
                        md-tab(id="tab-progress" md-label="progress")
                            SingleMatchProgress(:progress="tournamentInfo.events" :mapsPlayed="tournamentInfo.mapsPlayed")
                        md-tab(id="tab-playCharts" md-label="games ( tba )" md-disabled)
                            SingleMatchGames
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'underscore';
import SingleMatchTeams from './SingleMatchTeams.vue';
import SingleMatchProgress from './Progress/Index.vue';
import SingleMatchGames from './SingleMatchGames.vue';

@Component({
  components: {
    SingleMatchTeams,
    SingleMatchProgress,
    SingleMatchGames,
  },
})

export default class SingleMatch extends Vue {
  @Prop() private tournamentInfo!: any;
  // that's too big object, I cannot tell the type :/

  getLinkToOsuPage = () :string => `https://osu.ppy.sh/community/matches/${this.tournamentInfo.id}`;

  getGamemode = () :string => {
    const { gameModes } = this.tournamentInfo;

    function whichIsMostPlayed(playedCount) {
      if (playedCount === _.max(gameModes)) return true;
      return false;
    }

    return _.findKey(gameModes, whichIsMostPlayed);
  };

  getFinishScore = () :string => {
    const { mapsPlayed } = this.tournamentInfo;
    const scores = { red: 0, blue: 0 };

    mapsPlayed.forEach((map) => {
      if (map.summaryScore.blue > map.summaryScore.red) {
        scores.blue += 1;
      } else {
        scores.red += 1;
      }
    });

    return `${this.tournamentInfo.teams.names.blue} ${scores.blue}:${scores.red} ${this.tournamentInfo.teams.names.red}`;
  }
}
</script>

<style lang="sass">
.md-card
    max-width: 800px
    display: flex
    flex-wrap: wrap
    align-items: center
    box-sizing: border-box
    padding: 0px 20px
    overflow: hidden
    z-index: 1
    margin-bottom: 75px
    &-content
        padding: 0
    &-media
        flex-grow: 0
    &-header
        z-index: 1
        flex-grow: 3
        padding-top: 16px !important
        .md-title
            font-size: 1.5em
            a
                color: inherit
                text-decoration: none
    &-expand
        display: flex
        align-items: center
        .md-score
            font-weight: 800
            font-size: 1em
            color: $bg-content
        &-content
            width: 100%
            overflow: hidden
            z-index: -1
            position: relative
.md-card-media
    img
        height: 50px
        width: 50px

.match__container
    .md-tabs
        flex-direction: column-reverse
        &-content
            height: unset !important
            min-height: 250px
            max-height: 100%
        &-container
            height: 100%

.md-tab
    height: 100%
    padding: 0
</style>
