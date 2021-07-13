<template lang="pug">
  .content__container
    .content__container--content(v-if="!isTournamentEmpty() && isLoaded")
      .content__container--content--heading
        h3 {{tournament.title}}
        .content__container--content--heading--sub
          span(v-if="tournament.timeEnded")
              ="Ended at: "
              span {{dayjs(tournament.timeEnded).format('DD/MM/YYYY HH:mm Z')}}
          span(v-else)
              ='In progress...'
      .content__container--content--maps
        h3="Progress: "
        SingleMatchMaps(:progress="tournament.events" :mapsPlayed="tournament.mapsPlayed")
      .content__container--content--teams
        .match__container
          h3="Players: "
          SingleMatchQualifiers(:teams="tournament.teams" v-if="tournament.areQualifiers")
          SingleMatchTeams(:teams="tournament.teams" v-else-if="(tournament.teams.blue && tournament.teams.red) != 0")
          .matchNotStarted(v-else)
            h3="Waiting for the first map to start"
            p="Refresh that page after a minute"
            md-progress-spinner(md-mode="indeterminate" name="tournaments_spin")
        .content__container--content--results
        .content__container--footer
    .content__container--missingTournament(v-else-if="isLoaded && isTournamentEmpty()")
      h3="There is no tournament like that"
      md-button(class="md-raised md-primary" @click="$router.go(-1)")
        ="Go back"
    h3(v-else-if="!isLoaded")
      md-progress-spinner(md-mode="indeterminate" name="tournaments_spin")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import axios from 'axios';
import dayjs from 'dayjs';
import _ from 'underscore';
import SingleMatchTeams from '../components/match/SingleMatchTeams.vue';
import SingleMatchMaps from '../components/match/Progress/Index.vue';
import SingleMatchQualifiers from '../components/match/SingleMatchQualifiers.vue';

@Component({
  components: {
    SingleMatchTeams,
    SingleMatchMaps,
    SingleMatchQualifiers,
  },
})

export default class SingleTournament extends Vue {
  $route!: Route;

  tournamentId = this.$route.params.id;

  isLoaded = false;

  dayjs = dayjs;

  tournament = {};

  isTournamentEmpty() :boolean {
    if (_.isEmpty(this.tournament)) {
      return true;
    }

    return false;
  }

  async setTournamentInformations() :Promise< Record<string, number> > {
    const results = await axios({
      method: 'get',
      url: `http://localhost:3000/tournaments/${this.tournamentId}`,
    })
      .then((data) => data.data);

    return results[0];
  }

  async created() :Promise<void> {
    this.tournament = await this.setTournamentInformations();
    this.isLoaded = true;
  }
}
</script>

<style lang="sass" scoped>
.content__container
  width: 100%
  min-height: 800px
  display: flex
  align-items: center
  flex-direction: column
  &--missingTournament
    display: flex
    flex-direction: column
    justify-content: center
    h3
      color: white
      font-size: 2em
      padding: 15px 0px
    button
      margin: 0 auto
      color: white !important
  &--content
    display: flex
    flex-direction: column
    width: 100%
    align-items: center
    position: relative
    min-height: 900px
    transition-delay: 1s
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    h3
      text-align: center
      color: white
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

  ::v-deep .teams__container
    &--red
      .teams__container__member
        &--ranking
          padding-right: 10px
          text-align: left
          &--global
            padding-right: unset !important
    &--blue
      .teams__container__member
        &--ranking
          text-align: right
          margin-right: unset
          &--country
            flex-direction: row-reverse !important
  ::v-deep .teams__container__member
    height: 70px
    &--nickname
      &.qualifiers
        flex-basis: 80%
    .teams__container__member--ranking
      flex-direction: row
      flex-basis: unset
      font-size: 1.2em
      @media (max-width: 768px)
        flex-direction: column
      &--global
        padding-right: 10px
        font-size: inherit
        min-width: 100px
        span
          align-self: center
          padding-left: 4px
          min-width: 70px
      &--country
        font-size: inherit
        align-self: center
        flex-direction: row
        min-width: 75px
        margin: 0px 5px

  ::v-deep .md-stepper
    background: $bg-content
    color: white
    &-description, &-label
      color: white
  ::v-deep .md-steppers.md-theme-default
    background-color: $bg-content

  ::v-deep .progress__map__container
    &__mapInfo
      margin-top: -15px
      &__image
        flex-basis: 22%
        img
          max-width: 150px
          height: 100%

  ::v-deep .matchNotStarted
    h3, p
      text-align: center
      color: white

  ::v-deep .md-progress-spinner
    margin: 0 auto
    width: 20%
    display: flex
</style>
