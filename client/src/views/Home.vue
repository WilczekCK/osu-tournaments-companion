<template lang="pug">
  .content__container
    .content__container--header
      h2="Follow all tournaments of osu on a single page!"
    .content__container--content
      SingleMatch(:tournamentInfo="tournament" v-for="tournament in allTournaments")
      Pagination(@getTournamentsPage="changeTournamentPage")
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import SingleMatch from '../components/match/SingleMatch.vue';
import Pagination from '../components/match/Pagination.vue';

@Component({
  components: {
    HelloWorld,
    SingleMatch,
    Pagination,
  },
})
export default class Home extends Vue {
  allTournaments:Array<any> = [];

  fetchMatches = async (value) => {
    const results = await axios({
      method: 'get',
      url: `http://localhost:3000/tournaments/?limit=${5}&startFrom=${value}`,
    })
      .then((data: any) => data.data);

    return results;
  }

  changeTournamentPage = function (value) {
    this.allTournaments = [];
    this.allTournaments = this.fetchMatches(value);
  }

  async mounted() {
    this.allTournaments = await this.fetchMatches(1);
    return 0;
  }
}
</script>

<style lang="sass">
.content__container
  background: $bg-content
  width: 1080px
  min-height: 800px
  display: flex
  align-items: center
  flex-direction: column
  &--content
    display: flex
    flex-direction: column
    max-width: 100%
@media (max-width: 1080px)
  .content__container
    width: 100%
</style>
