<template lang="pug">
  .content__container
    .content__container--content
      .content__container--header
        h2="Follow all tournaments of osu on a single page!"
      transition(:name="animationName")
        MatchList(v-if="show" :tournaments="allTournaments")
      Pagination(@getTournamentsPage="changeTournamentPage" @triggerFadeAnimation="triggerFadeAnimation" :isMatchLoaded="matchLoaded")
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

  show = true;

  animationName = '';

  matchLoaded = false;

  fetchMatches = async (value) => {
    const results = await axios({
      method: 'get',
      url: `http://localhost:3000/tournaments/?limit=${5}&startFrom=${value * 5}`,
    })
      .then((data: any) => data.data)
      .then((data: any) => {
        this.matchLoaded = true;
        return data;
      });

    return results;
  }

  async changeTournamentPage(value) {
    this.allTournaments = await this.fetchMatches(value);
  }

  async triggerFadeAnimation({ side, speedOfAnimation }) {
    this.show = false;

    setTimeout(() => {
      this.animationName = `slide-${side}`;
      this.show = true;
    }, 200);
  }

  async created() {
    this.allTournaments = await this.fetchMatches(0);
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
    min-height: 900px
  &--header
    padding: 25px 0px 50px
@media (max-width: 1080px)
  .content__container
    width: 100%
.md-progress-spinner
  transform: none !important

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
