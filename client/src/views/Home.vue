<template lang="pug">
  .content__container
    .content__container--content
      .content__container--header
        h2="Follow all tournaments of osu on a single page!"
      Filtering(
        @queryAppended="setAdditionalQuery"
        @reloadPagination="shouldReload = true"
      )
      MatchList(
        :actualPage="props.pagination.actualPage"
        :animationDetails="props.pagination.animationDetails"
      )
      Pagination(
        @getTournamentsPage="props.pagination.setNewPage"
        @triggerFadeAnimation="props.pagination.setAnimationDetails"
        :isMatchLoaded="matchLoaded"
        :reloadPaginationQuery="this.additionalQuery"
      )
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
  props = {
    matches: {
      isMatchLoaded: false,
    },
    filtering: {
      reloadPage: false,
      queryMatches: '',
    },
    pagination: {
      doFadeAnimation: false,
      animationDetails: {},
      actualPage: 0,
      setNewPage: (pageNumber: number):void => { this.props.pagination.actualPage = pageNumber; },
      setAnimationDetails: (animationName: Record<string, number>):void => { this.props.pagination.animationDetails = animationName; },
    },
  };
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
</style>
