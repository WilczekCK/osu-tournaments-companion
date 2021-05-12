<template lang="pug">
    .pagination__container
        div(:class="{ delay: delay }" class="pagination__container__button")
          button(@click="changePage('prev')")
            .pagination__container__button--label
              small {{currentPage.value-1}}/{{lastPage.value}}
              span(class="material-icons md-layout-item")
                ="west"
              .
                recent
        .pagination__container--divider
        div(:class="{ delay: delay }" class="pagination__container__button")
          button(@click="changePage('next')")
            .pagination__container__button--label
              small {{currentPage.value+1}}/{{lastPage.value}}
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
import { usePagination } from 'vue-composable';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

@Component
export default class Pagination extends Vue {
    @Prop() public isMatchLoaded!: boolean;

    nextPage = {};

    prevPage = {};

    currentPage = {};

    lastPage = {};

    totalSize = 0;

    delay = false;

    sideToFade = '';

    recentPageSize = 0;

    countMatches = async () => {
      const results = await axios({
        method: 'get',
        url: 'http://localhost:3000/tournaments/countTournaments',
      })
        .then((data: any) => data.data);

      return results;
    }

    changePage(to) {
      if (to === 'prev' && this.delay === false) {
        this.prevPage();
      } else if (to === 'next' && this.delay === false) {
        this.nextPage();
      }
    }

    fadeAnimation(newValue) {
      const speedOfAnimation = 0.3;
      if (this.recentPageSize > (newValue || !newValue)) {
        this.sideToFade = 'left';
        this.$emit('triggerFadeAnimation', { side: this.sideToFade, speedOfAnimation });
      } else {
        this.sideToFade = 'right';
        this.$emit('triggerFadeAnimation', { side: this.sideToFade, speedOfAnimation });
      }
      this.recentPageSize = newValue;
    }

    async created() {
      this.totalSize = await this.countMatches();

      const {
        currentPage, lastPage, next, prev, first,
      } = usePagination({
        currentPage: 1,
        pageSize: 5,
        total: this.totalSize,
      });

      this.nextPage = next;

      this.prevPage = prev;

      this.currentPage = currentPage;

      this.lastPage = lastPage;
    }

    @Watch('currentPage.value')
    loadTournaments = (newValue = '1') => {
      this.$emit('getTournamentsPage', newValue);
      this.fadeAnimation(newValue);
    };

    @Watch('isMatchLoaded')
    delayMaker(isLoaded) {
      this.delay = true;

      if (isLoaded) {
        setTimeout(() => {
          this.delay = false;
        }, 300);
      }
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
