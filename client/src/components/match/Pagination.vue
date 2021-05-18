<template lang="pug">
    .pagination__container
        div(:class="{ delay: pagination.delayBetweenPages || pagination.currentPage === 0}" class="pagination__container__button")
          button(@click="changePage('prev')")
            .pagination__container__button--label
              small {{this.pagination.currentPage}} / {{pagination.maxPage}}
              span(class="material-icons md-layout-item")
                ="west"
              .
                recent
        .pagination__container--divider
        div(:class="{ delay: pagination.delayBetweenPages || pagination.currentPage+1 === pagination.maxPage }" class="pagination__container__button")
          button(@click="changePage('next')")
            .pagination__container__button--label
              small {{this.pagination.currentPage + 1}} / {{pagination.maxPage}}
              span(class="material-icons md-layout-item")
                ="east"
              .
                older
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Pagination extends Vue {
    @Prop() public isMatchLoaded!: boolean;

    @Prop() public reloadPaginationQuery!: string;

    pagination = {
      currentPage: 0,
      sumPages: 0, // look mounted, overwritten at load :)
      recentPageSize: 0,
      delayBetweenPages: false,
      sideToFade: '',
      recordsOnPage: 5,
      maxPage: 1,
      setMaxPage: () => {
        this.pagination.maxPage = Math.ceil(this.pagination.sumPages / this.pagination.recordsOnPage);
      },
    };

    nextPage = () => {
      this.pagination.currentPage += 1;
    }

    prevPage = () => {
      this.pagination.currentPage -= 1;
    }

    countMatches = async (additionalQuery = '') => {
      const results = await axios({
        method: 'get',
        url: `http://localhost:3000/tournaments/countTournaments${additionalQuery}`,
      })
        .then((data: any) => data.data);

      return results;
    }

    changePage(to: string) {
      if (to === 'prev' && this.pagination.delayBetweenPages === false && this.pagination.currentPage > 0) {
        this.pagination.recentPageSize = this.pagination.currentPage;
        this.prevPage();
      } else if (to === 'next' && this.pagination.delayBetweenPages === false && this.pagination.currentPage + 1 < this.pagination.maxPage) {
        this.pagination.recentPageSize = this.pagination.currentPage;
        this.nextPage();
      }

      this.fadeAnimation(this.pagination.recentPageSize);
      this.$emit('getTournamentsPage', this.pagination.currentPage);
    }

    fadeAnimation(newValue: number) {
      const speedOfAnimation = 600;
      if (this.pagination.recentPageSize > (newValue || !newValue)) {
        this.pagination.sideToFade = 'slide-left';
        this.$emit('triggerFadeAnimation', { side: this.pagination.sideToFade, speedOfAnimation });
      } else {
        this.pagination.sideToFade = 'slide-right';
        this.$emit('triggerFadeAnimation', { side: this.pagination.sideToFade, speedOfAnimation });
      }
      this.pagination.recentPageSize = newValue;
    }

    async mounted() {
      this.pagination.sumPages = await this.countMatches();
      this.pagination.setMaxPage();
    }

    @Watch('isMatchLoaded')
    delayMaker(isLoaded: boolean) {
      this.pagination.delayBetweenPages = true;
      if (isLoaded) {
        this.pagination.delayBetweenPages = false;
      }
    }

    @Watch('reloadPaginationQuery')
    async recalcPages() {
      this.pagination.currentPage = 0;
      this.pagination.sumPages = await this.countMatches(`?${this.reloadPaginationQuery}`) || 1;
      this.pagination.setMaxPage();
    }
}
</script>

<style lang="sass">
  .pagination__container
    position: absolute
    width: 100%
    height: 100%;
    display: flex
    flex-direction: row
    justify-content: center
    @media (max-width: 1000px)
      position: relative
    &--divider
      width: 95%
      z-index: -1
    &__button
      button
        height: 100%
        font-size: 1em
        background: rgba(0,0,0,.2)
        border: unset
        color: white
        cursor: pointer
        transition: color .5s, min-width .5s
        padding: 0px 10px
        min-width: 75px
        small
          font-size: .7em
          display: block
        &:hover
          color: $link-active
          min-width: 85px
        @media (max-width: 1000px)
          height: 75px
          width: 100%
      @media (max-width: 1000px)
        width: 100%
      &--label
        display: flex;
        flex-direction: column;
    @media (max-width: 1000px)
      &--divider
        display: none
  .delay
    button
      position: relative
      color: grey !important
      &:after
        z-index: 999
        position: absolute
        left: 0
        top: 0
        content: ''
        width: 100%
        height: 100%
</style>
