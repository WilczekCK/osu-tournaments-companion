<template lang="pug">
  .content__container
    .content__container--content
      p {{tournament.title}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class SingleTournament extends Vue {
  tournamentId = this.$route.params.id;

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

<style lang="sass">
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
  &--header
    padding: 25px 0px 50px
</style>
