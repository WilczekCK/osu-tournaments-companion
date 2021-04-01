<template lang="pug">
  .content__container
    .content__container--header
      h2="Follow all tournaments of osu on a single page!"
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
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
