<template lang="pug">
  .content__container
    .content__container--content
      .content__container--header
        h2="Follow all tournaments of osu on a single page!"
      Filtering(@queryAppended="setAdditionalQuery" @reloadPagination="shouldReload = true")
      transition(:name="animationName")
        MatchList
      Pagination(@getTournamentsPage="changeTournamentPage" @triggerFadeAnimation="triggerFadeAnimation" :isMatchLoaded="matchLoaded" :reloadPaginationQuery="this.additionalQuery")
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import MatchList from '../components/match/MatchList.vue';
import Pagination from '../components/match/Pagination.vue';
import Filtering from '../components/match/Filtering.vue';

@Component({
  components: {
    HelloWorld,
    MatchList,
    Pagination,
    Filtering,
  },
})
export default class Home extends Vue {
  props:{
    MatchesComponent: {
      isMatchLoaded: false,
      animationName: '',
    },
    filteringComponent: {
      reloadPage: false,
      queryMatches: '',
    },
    paginationComponent: {
      doFadeAnimation: false,
      actualPage: 0,
    }
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
