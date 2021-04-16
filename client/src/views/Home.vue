<template lang="pug">
  .content__container
    .content__container--header
      h2="Follow all tournaments of osu on a single page!"
      div(v-for="tournament in allTournaments")
        SingleMatch
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import SingleMatch from '../components/match/SingleMatch.vue';

@Component({
  components: {
    HelloWorld,
    SingleMatch,
  },
})
export default class Home extends Vue {
  allTournaments:Array<any> = [];

  fetchMatches = async () => {
    const results = await axios({
      method: 'get',
      url: 'http://localhost:3000/tournaments/',
    })
      .then((data: any) => data.data);

    return results;
  }

  async mounted() {
    const getTournamentsFromApi = await this.fetchMatches();

    this.allTournaments = getTournamentsFromApi;
    return 0;
  }
}
</script>

<style lang="sass">
.content__container
  background: $bg-content
  width: 1080px
  min-height: 800px

@media (max-width: 1080px)
  .content__container
    width: 100%
</style>
