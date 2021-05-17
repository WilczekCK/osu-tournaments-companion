<template lang="pug">
    .match__list
      transition(v-if="matches.areLoaded" :name="animationDetails.side")
        .match__list__container(v-if="matches.isAnimationEnded")
          SingleMatch(v-for="tournament in matches.loadedTournaments" :tournamentInfo="tournament" :key="tournament.id")
        h3(v-else-if="matches.loadedTournaments.length === 0")="No more tournaments :("
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
  @Prop() private actualPage!: number;

  @Prop() private animationDetails!: Record<string, number>;

  @Prop() private queryFilter!: string;

  matches = {
    loadedTournaments: [],
    additionalQuery: '',
    areLoaded: false,
    isAnimationEnded: false,
    changePage: async (pageNumber) => {
      // replace with new tournaments in array
      const fetchMatches = await this.matches.fetch(pageNumber);

      if (fetchMatches.status === 404) {
        this.matches.loadedTournaments = [];
      } else {
        this.matches.loadedTournaments = fetchMatches;
      }
    },
    setAdditionalQuery: async (query) => {
      // set and load new matches
      this.matches.additionalQuery = query;
      await this.matches.changePage(0);
    },
    fetch: async (startPage) => {
      this.matches.areLoaded = false;

      const results = await axios({
        method: 'get',
        url: `http://localhost:3000/tournaments/?limit=${5}&startFrom=${startPage * 5}&${this.matches.additionalQuery}`,
      })
        .then((data: any) => data.data);

      this.matches.nextPageAnimation();
      this.matches.areLoaded = true;
      return results;
    },
    nextPageAnimation: async () => {
      this.matches.isAnimationEnded = false;

      setTimeout(() => {
        this.matches.isAnimationEnded = true;
      }, this.animationDetails.speedOfAnimation);
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

  @Watch('matches.areLoaded')
  emitLoadingStatus(status) {
    this.$emit('matchesLoaded', status);
  }
}
</script>

<style lang="sass">
.match__list
  max-width: 99%
  padding: 20px 0px
  h3, .md-progress-spinner
    text-align: center
    margin: 0 auto
    width: 100%
    display: flex
    justify-content: center

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
