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

<style lang="sass">
html
body
  background: $bg-body
  margin: 0
  padding: 0
  width: 100%

#app
  margin: 0 auto
  display: flex
  flex-direction: column
  align-items: center
</style>
