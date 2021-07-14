<template lang="pug">
  .content__container
    .content__container--content
      .content__container--header
        img(:src="require(`@/assets/header.png`)")
        small="Aware that created not correctly tournaments can cause wrong results"
      Filtering(
        @queryAppended="props.filtering.setFilterQuery"
      )
      MatchList(
        @matchesLoaded="props.matches.setLoadingState"
        :actualPage="props.pagination.actualPage"
        :animationDetails="props.pagination.animationDetails"
        :queryFilter="props.filtering.filterQuery"
      )
      Pagination(
        @getTournamentsPage="props.pagination.setNewPage"
        @triggerFadeAnimation="props.pagination.setAnimationDetails"
        :isMatchLoaded="props.matches.areLoaded"
        :reloadPaginationQuery="props.filtering.filterQuery"
      )
</template>

<script lang="ts">
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
      areLoaded: false,
      setLoadingState: (status: boolean):void => { this.props.matches.areLoaded = status; },
    },
    filtering: {
      filterQuery: {},
      setFilterQuery: (filterQuery: Record<string, number>):void => { this.props.filtering.filterQuery = `queryKey=${filterQuery.key}&queryValue=${filterQuery.value}`; },
    },
    pagination: {
      animationDetails: {},
      actualPage: 0,
      setNewPage: (pageNumber: number):void => { this.props.pagination.actualPage = pageNumber; },
      setAnimationDetails: (animationDetails: Record<string, number>):void => { this.props.pagination.animationDetails = animationDetails; },
    },
  };
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
    padding: 30px 0px 10px
    display: flex
    flex-direction: column
    small
      text-align: center
      padding-top: 2px
      color: grey
</style>
