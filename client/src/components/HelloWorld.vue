<template lang="pug">
  .hello
    h2
      ="Component example"
    p {{msg}}

    md-menu(md-direction="bottom-start")
      md-button(md-menu-trigger)
        ="Bottom Start"
      md-menu-content
        md-menu-item
          ="My Item 1"
        md-menu-item
          ="My Item 2"
        md-menu-item
          ="My Item 3"
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
