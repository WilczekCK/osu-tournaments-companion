<template lang="pug">
    .filtering__container
      .filtering__container__input
        h3="Find by mods or"
        md-field
          label enter keywords to search for tournaments
          md-input(v-model="searchInput" @input="debounceQuery(searchInput)")
      .filtering__container__mods
        .filtering__container__mods--osu
          img(src="@/assets/osu.svg" alt="std" @click="lookForMode = 'osu'" :class="{ modeActive: lookForMode === 'osu' }")
        .filtering__container__mods--taiko
          img(src="@/assets/taiko.svg" alt="taiko" @click="lookForMode = 'taiko'" :class="{ modeActive: lookForMode === 'taiko' }")
        .filtering__container__mods--mania
          img(src="@/assets/mania.svg" alt="mania" @click="lookForMode = 'mania'" :class="{ modeActive: lookForMode === 'mania' }")
        .filtering__container__mods--fruits
          img(src="@/assets/fruits.svg" alt="fruits" @click="lookForMode = 'fruits'" :class="{ modeActive: lookForMode === 'fruits' }")
</template>
<script lang="ts">
import {
  Component, Vue, Watch,
} from 'vue-property-decorator';
import _ from 'underscore';

@Component
export default class Filtering extends Vue {
  lookForKeywords = ''

  lookForMode = '';

  queryCreated = {};

  searchInput = '';

  debounceQuery = _.debounce(function () {
    this.lookForKeywords = this.searchInput;
  }, 300);

  @Watch('lookForKeywords')
  createKeywordQuery() {
    this.lookForMode = '';

    this.queryCreated = { key: 'title', value: this.lookForKeywords };
    this.$emit('queryAppended', this.queryCreated);
  }

  @Watch('lookForMode')
  createModeQuery() {
    this.lookForKeywords = '';

    this.queryCreated = { key: 'gameMode', value: this.lookForMode };
    this.$emit('queryAppended', this.queryCreated);
  }
}
</script>

<style lang="sass">
 .filtering__container
    width: 600px
    overflow: hidden
    padding-top: 10px
    padding-bottom: 50px
    text-align: center
    z-index: 1
    @media (max-width: 600px)
      width: 90%
      padding-bottom: 10px
    &__input
      color: white
      display: flex
      flex-direction: row
      justify-content: center
      align-items: center
      padding-bottom: 15px
      width: 100%
      @media (max-width: 600px)
        flex-direction: column
      h3
        white-space: nowrap
        padding-right: 15px
        @media (max-width: 600px)
          padding: 0px
          margin: 0px
      .md-field
        font-weight: 600
        input
          color: $link-active !important
          -webkit-text-fill-color: $link-active !important
        &::after
          background-color: rgba(255,255,255,.42)
      .md-field:not(.md-focused)
        label
          color: white !important
          @media (max-width: 600px)
            font-size: 1em
    &__mods
      max-height: 100%
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      cursor: pointer
      img
        height: 70px
        width: 100%
        opacity: .6
        transition: opacity .3s
        &:hover, &.modeActive
          opacity: 1
</style>
