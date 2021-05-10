<template lang="pug">
    .pagination__container
        //p "page" {{ currentPage }} "of" {{ lastPage }}
        div(:class="{ delay: delay }")
          button(class="pagination__container__button" @click="prevPage")
            .pagination__container__button--label
              span(class="material-icons md-layout-item")
                ="west"
              .
                recent
        .pagination__container--divider
        div(:class="{ delay: delay }")
          button(class="pagination__container__button" @click="nextPage")
            .pagination__container__button--label
              span(class="material-icons md-layout-item")
                ="east"
              .
                older
</template>
<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import axios from 'axios';
import { usePagination } from 'vue-composable';
import VueCompositionAPI from '@vue/composition-api';

Vue.use(VueCompositionAPI);

@Component
export default class Pagination extends Vue {
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

    async attachDelay() {
      this.delay = true;
      // remove delay
      setTimeout(() => {
        this.delay = false;
      }, 500);
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

    async mounted() {
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
      this.attachDelay();
    };
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
      height: 100%
      font-size: 3em
      background: rgba(0,0,0,.2)
      border: unset
      color: white
      cursor: pointer
      transition: color .5s, padding .5s
      &--label
        font-size: 14px
      &:hover
        color: $link-active
        padding: 15px 15px
      @media (max-width: 1000px)
        height: 50px
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
