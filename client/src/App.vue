<template lang='pug'>
  #app
    navbar
    router-view
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import navbar from './components/NavBar.vue';

@Component({
  components: {
    navbar,
  },
})

export default class Home extends Vue {}
</script>

<style lang="stylus">
html
body
  background #535353
  margin 0
  padding 0
  width 100%

#app
  width 1280px
  margin 0 auto
  display flex
  flex-direction column
  align-items center
</style>
