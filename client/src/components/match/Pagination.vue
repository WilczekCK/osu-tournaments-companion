<template lang="pug">
    .pagination__container
        div(:class="{ delay: delay }" class="pagination__container__button")
          button(@click="changePage('prev')")
            .pagination__container__button--label
              small {{pagination.currentPage-1}}
              span(class="material-icons md-layout-item")
                ="west"
              .
                recent
        .pagination__container--divider
        div(:class="{ delay: delay }" class="pagination__container__button")
          button(@click="changePage('next')")
            .pagination__container__button--label
              small {{pagination.currentPage+1}}
              span(class="material-icons md-layout-item")
                ="east"
              .
                older
</template>
<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
    @Prop() public isMatchLoaded!: boolean;

    pagination = {
      currentPage: 0,
      numPages: 22,
    };

    recentPageSize = 0;

    delay = false;

    sideToFade = '';

    nextPage = () => {
      this.pagination.currentPage += 1;
    }

    prevPage = () => {
      this.pagination.currentPage -= 1;
    }

    changePage(to) {
      if (to === 'prev' && this.delay === false) {
        this.recentPageSize = this.pagination.currentPage;
        this.prevPage();
      } else if (to === 'next' && this.delay === false) {
        this.recentPageSize = this.pagination.currentPage;
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

    @Watch('pagination.currentPage')
    loadTournaments = (newValue = '1') => {
      this.$emit('getTournamentsPage', newValue);
      this.fadeAnimation(newValue);
    };

    @Watch('isMatchLoaded')
    delayMaker(isLoaded) {
      this.delay = true;

      if (isLoaded) {
        this.delay = false;
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
