<template lang="pug">
    .filtering__container
      .filtering__container__input
        h3="Find by mods or write the keywords here:"
        input(type="input" placeholder="OWC")
      .filtering__container__mods
        .filtering__container__mods--osu
          img(src="@/assets/osu.svg" alt="std")
        .filtering__container__mods--taiko
          img(src="@/assets/taiko.svg" alt="taiko")
        .filtering__container__mods--mania
          img(src="@/assets/mania.svg" alt="mania")
        .filtering__container__mods--fruits
          img(src="@/assets/fruits.svg" alt="fruits")
</template>
<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';

@Component
export default class Filtering extends Vue {

}
</script>

<style lang="sass">
 .filtering__container
    width: 768px
    overflow: hidden
    padding: 15px 0px
    text-align: center
    z-index: 1
    &__input
      display: flex
      flex-direction: row
      justify-content: center
      width: 100%
      input
        width: 100%
    &__mods
      max-height: 100%
      width: 100%
      display: flex
      flex-direction: row
      justify-content: space-between
      img
        height: 70px
        width: 100%
</style>
