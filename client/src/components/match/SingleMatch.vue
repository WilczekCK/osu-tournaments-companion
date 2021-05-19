<template lang="pug">
    md-card
        md-card-media
            img(:src="require(`@/assets/${tournamentInfo.gameMode}.svg`)")
        md-card-header
            .md-title
                .link__row
                    router-link(:to="`/tournaments/${tournamentInfo.id}`")
                        span(class="material-icons md-layout-item" @mousedown="opened = true") link
                    a(:href="`https://osu.ppy.sh/community/matches/${tournamentInfo.id}`" target="_blank")
                        span(class="osu-icon") osu!
                h3 {{tournamentInfo.title}}
            .md-subtitle
                span(v-if="tournamentInfo.timeEnded")
                    ="Ended at: "
                    span {{dayjs(tournamentInfo.timeEnded).format('DD/MM/YYYY HH:mm Z')}}
                span(v-else)
                    ='In progress...'
        md-card-expand
            .md-score {{tournamentInfo.teams.names.red}} {{this.matchScore.red}}
                .
                    :
                .
                    {{this.matchScore.blue}} {{this.tournamentInfo.teams.names.blue}}
            md-card-actions(md-aligment="space-between")
                md-card-expand-trigger
                    md-button(class="md-mini" @mousedown="opened = true")
                        span(class="material-icons md-layout-item" @mousedown="opened = true")
                            ="keyboard_arrow_down"
        md-card-expand-content
            md-card-content
                .match__container
                    md-tabs(md-alignment="fixed" v-if="opened")
                        md-tab(id="tab-teams" md-label="teams")
                            SingleMatchTeams(:teams="tournamentInfo.teams" v-if="(tournamentInfo.teams.blue && tournamentInfo.teams.red) != 0")
                            .matchNotStarted(v-else)
                                h3="Waiting for the first map to start"
                                md-progress-spinner(md-mode="indeterminate" name="progress_spin")
                        md-tab(id="tab-progress" md-label="progress")
                            SingleMatchProgress(:progress="tournamentInfo.events" :mapsPlayed="tournamentInfo.mapsPlayed")
                        md-tab(id="tab-playCharts" md-label="games ( tba )" md-disabled)
                            SingleMatchGames
                    md-progress-spinner(md-mode="indeterminate" name="tournaments_spin" v-else)
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import _ from 'underscore';
import dayjs from 'dayjs';
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

  dayjs = dayjs;

  opened = false;

  matchScore = { red: 0, blue: 0 };

  getFinishScore = () :void => {
    const { mapsPlayed } = this.tournamentInfo;

    mapsPlayed.forEach((map:any) => {
      if (map.summaryScore.blue > map.summaryScore.red) {
        this.matchScore.blue += 1;
      } else if (map.summaryScore.blue < map.summaryScore.red) {
        this.matchScore.red += 1;
      }
    });
  }

  mounted() {
    this.getFinishScore();
  }
}
</script>

<style lang="sass">
.md-card
    max-width: 800px
    min-width: 315px
    display: flex
    flex-wrap: wrap
    align-items: center
    box-sizing: border-box
    padding: 0px 15px
    overflow: hidden
    z-index: 1
    margin-bottom: 75px
    @media (max-width: 600px)
        flex-direction: column
        margin: 0 auto
        margin-top: 75px
        min-width: unset
        max-width: unset
        width: 99%
        padding: 0
        flex-wrap: nowrap
    &-content
        padding: 0 !important
        margin: 0 !important
    &-media
        flex-grow: 0
        background: rgba(0,0,0,.05)
        padding: 5px
        border-radius: 5px
        @media (max-width: 600px)
            margin-top: 10px
    &-header
        z-index: 1
        flex-grow: 3
        padding-top: 16px !important
        max-width: 60%
        padding-bottom: 30px
        @media (max-width: 600px)
            max-width: 100%
            flex-grow: 0
        .md-title
            font-size: 1.5em
            display: flex
            flex-direction: row
            flex-wrap: wrap
            .link__row
                width: 100%
                display: flex
                flex-direction: row
                align-items: flex-end
                a
                    margin-right: 5px
                span
                    vertical-align: middle
            a
                color: inherit
                text-decoration: none
                word-wrap: break-word
            h3
                font-size: .9em
                text-align: left
                margin: 0
                padding: 0
                padding-bottom: 5px
                justify-content: flex-start
                font-weight: 500
    &-expand
        display: flex
        justify-content: flex-end
        align-items: center
        flex-basis: 30%
        @media (max-width: 600px)
            width: 100%
            flex-direction: row
            justify-content: center
            flex-basis: unset
            padding-bottom: 15px
        .md-score
            text-align: right
            font-weight: 800
            font-size: 1em
            color: $bg-content
            width: 100%
        .md-card-actions
            @media (max-width: 600px)
                max-height: 50px
        &-content
            width: 100%
            overflow: hidden
            z-index: -1
            position: relative
            @media (max-width: 600px)
                width: 100%
    .md-button
        min-width: 0
.md-card-media
    img
        height: 50px
        width: 50px

.match__container
    .md-progress-spinner
        width: 100%
        svg
            margin: 0 auto
    .md-tabs
        flex-direction: column-reverse
        &-content
            height: unset !important
            min-height: 250px
            max-height: 100%
        &-container
            height: 100%
        #tab-teams
            .matchNotStarted
                text-align: center

.md-tab
    height: 100%
    padding: 0

.osu-icon
    width: 15px
    height: 15px
    border: 1.5px solid black
    border-radius: 50%
    padding: 4px 1.25px
    font-size: .4em
    transition: all .3s ease-in
    &:hover
        border-color: $link-active
</style>
