<template lang="pug">
  .content__container
    .content__container--content
      .content__container--header
        h2="Follow all tournaments of osu on a single page!"
      MatchList(:tournaments="allTournaments")
      Pagination(@getTournamentsPage="changeTournamentPage")
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import MatchList from '../components/match/MatchList.vue';
import Pagination from '../components/match/Pagination.vue';

@Component({
  components: {
    HelloWorld,
    MatchList,
    Pagination,
  },
})
export default class Home extends Vue {
  allTournaments:Array<any> = [];

  fetchMatches = async (value) => {
    const results = await axios({
      method: 'get',
      url: `http://localhost:3000/tournaments/?limit=${5}&startFrom=${value * 5}`,
    })
      .then((data: any) => data.data);

    return results;
  }

  async changeTournamentPage(value) {
    this.allTournaments = await this.fetchMatches(value);
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
    width: 100%
    align-items: center
    position: relative
  &--header
    padding: 25px 0px 50px
@media (max-width: 1080px)
  .content__container
    width: 100%
.md-progress-spinner
  transform: none !important
</style>
