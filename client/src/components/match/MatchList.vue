<template lang="pug">
    .match__list
      transition(:name="matches.animationDetails.side")
        .match__list__container(v-if="matches.isAnimationEnded")
          SingleMatch(v-for="tournament in matches.loadedTournaments" :tournamentInfo="tournament" :key="tournament.id")
        h3(v-else-if="matches.loadedTournaments.length <= 0")="No more tournaments :("
        md-progress-spinner(md-mode="indeterminate" name="tournaments_spin" v-else-if="matches.loadedTournaments === undefined && !matches.isAnimationEnded ")
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
  @Prop() private actualPage!: number;

  @Prop() private animationDetails!: Record<string, number>;

  @Prop() private queryFilter!: string;

  matches = {
    loadedTournaments: [],
    additionalQuery: '',
    areLoaded: false,
    isAnimationEnded: false,
    animationDetails: {
      side: 'slide-right',
      speedOfAnimation: 0.3,
    },
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
      this.matches.nextPageAnimation();
      return results;
    },
    nextPageAnimation: async () => {
      this.matches.isAnimationEnded = false;

      setTimeout(() => {
        this.matches.isAnimationEnded = true;
      }, this.matches.animationDetails.speedOfAnimation);
    },
  }

  async created() {
    this.matches.loadedTournaments = await this.matches.fetch(0);
  }

  @Watch('actualPage')
  async pageChanged(pageNumber) {
    await this.matches.changePage(pageNumber);
  }

  @Watch('queryFilter')
  async displayFilteredMatches() {
    this.matches.setAdditionalQuery(this.queryFilter);

    // we need to set it as page 0, because of new, queried results
    await this.matches.changePage(0);
  }
}
</script>

<style lang="sass">
.slide-left-enter-active
  transition: all .6s ease;
.slide-left-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
.slide-left-enter, .slide-fade-leave-to
  transform: translateX(-20px)
  opacity: 0

.slide-right-enter-active
  transition: all .6s ease;
.slide-right-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
.slide-right-enter, .slide-fade-leave-to
  transform: translateX(20px)
  opacity: 0
</style>
