<template lang="pug">
  .content__container
    .content__container--header
      h2="Follow all tournaments of osu on a single page!"
      SingleMatch
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue';
import SingleMatch from '../components/SingleMatch.vue';

@Component({
  components: {
    HelloWorld,
    SingleMatch,
  },
})
export default class Home extends Vue {}
</script>

<style lang="sass">
.content__container
  background: $bg-content
  width: 1080px
  min-height: 800px

@media (max-width: 1080px)
  .content__container
    width: 100%
</style>
