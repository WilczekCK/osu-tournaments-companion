<template lang="pug">
  .content__container
    .content__container--content
      .content__container--content--heading
        h3 {{tournament.title}}
        .content__container--content--heading--sub
          span(v-if="tournament.timeEnded")
              ="Ended at: "
              span {{dayjs(tournament.timeEnded).format('DD/MM/YYYY HH:mm Z')}}
          span(v-else)
              ='In progress...'
      .content__container--content--maps
        SingleMatchMaps(:progress="tournament.events" :mapsPlayed="tournament.mapsPlayed")
      .content__container--content--teams
        .match__container
          SingleMatchTeams(:teams="tournament.teams" v-if="(tournament.teams.blue && tournament.teams.red) != 0")
          .matchNotStarted(v-else)
            h3="Waiting for the first map to start"
      .content__container--content--results
    .content__container--footer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import dayjs from 'dayjs';
import SingleMatchTeams from '../components/match/SingleMatchTeams.vue';
import SingleMatchMaps from '../components/match/Progress/Index.vue';

@Component({
  components: {
    SingleMatchTeams,
    SingleMatchMaps,
  },
})

export default class SingleTournament extends Vue {
  tournamentId = this.$route.params.id;

  dayjs = dayjs;

  tournament = {};

  async setTournamentInformations() {
    const results = await axios({
      method: 'get',
      url: `http://localhost:3000/tournaments/${this.tournamentId}`,
    })
      .then((data: any) => data.data);

    return results[0];
  }

  async mounted() {
    this.tournament = await this.setTournamentInformations();
  }
}
</script>

<style lang="sass" scope>
.content__container
  width: 100%
  min-height: 800px
  display: flex
  align-items: center
  flex-direction: column
  &--content
    display: flex
    flex-direction: column
    width: 100%
    align-items: center
    position: relative
    min-height: 900px
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    &--heading
      padding-top: 15px
      font-size: 1.5em
      color: $link-color
      &--sub
        font-size: .8em
        opacity: .7
        margin-top: -10px
        text-align: center
    &--teams
      margin: 30px 0px
      width: 100%
    &--maps
      margin: 30px 0px
      width: 100%

  .teams__container
    &--red
      .teams__container__member
        &--ranking
          padding-right: 10px
    &--blue
      .teams__container__member
        &--ranking
          margin-right: unset
          span
            text-align: left
  .teams__container__member
    height: 70px
    .teams__container__member--ranking
      flex-direction: row
      flex-basis: unset
      font-size: 1.2em
      &--global
        font-size: inherit
        span
          align-self: center
          padding-left: 4px
          min-width: 70px
      &--country
        font-size: inherit
        align-self: center
        flex-direction: row
        img
          width: 50px

</style>
