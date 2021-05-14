<template lang="pug">
  .match__container(v-if="matches.loadedTournaments.length > 0")
    SingleMatch(v-for="tournament in matches.loadedTournaments" :tournamentInfo="tournament" :key="tournament.id")
  h3(v-else-if="matches.loadedTournaments.length === undefined")="No more tournaments :("
  md-progress-spinner(md-mode="indeterminate" name="tournaments_spin" v-else)
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import axios from 'axios';
import SingleMatch from './SingleMatch.vue';

@Component({
  components: {
    SingleMatch,
  },
})
export default class MatchList extends Vue {
  matches = {
    loadedTournaments: [],
    additionalQuery: '',
    areLoaded: false,
    changePage: async (pageNumber) => {
      // replace with new tournaments in array
      this.matches.loadedTournaments = await this.matches.fetch(pageNumber);
    },
    setAdditionalQuery: async (query) => {
      // set and load new matches
      this.matches.additionalQuery = `queryKey=${query.key}&queryValue=${query.value}`;
      this.matches.loadedTournaments = await this.matches.fetch(0);
    },
    fetch: async (startPage) => {
      this.matches.areLoaded = false;

      const results = await axios({
        method: 'get',
        url: `http://localhost:3000/tournaments/?limit=${5}&startFrom=${startPage * 5}&${this.matches.additionalQuery}`,
      })
        .then((data: any) => data.data);

      this.matches.areLoaded = true;
      return results;
    },
  }

  async created() {
    this.matches.loadedTournaments = await this.matches.fetch(0);
  }
}
</script>

<style lang="sass">
.match__container
</style>
