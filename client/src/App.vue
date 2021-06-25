<template lang='pug'>
  #app
    navbar(name="menu")
    transition( mode="out-in" :name="transitionName")
      router-view
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import navbar from './components/NavBar.vue';

@Component({
  components: {
    navbar,
  },
})

export default class Home extends Vue {
  transitionName = '';

  @Watch('$route')
  doSmth(to:any, from:any) :void {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  }
}
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
  background: $bg-content
  width: 1080px
  min-height: 800px
  @media (max-width: 1080px)
    width: 100%

.slide-left-enter-active
  transition: all .6s ease;
.slide-left-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
.slide-left-enter, .slide-fade-leave-to
  transform: translateX(-20px)
  opacity: 0

.slide-right-enter-active
  transition: all .6s ease;
.slide-right-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
.slide-right-enter, .slide-fade-leave-to
  transform: translateX(20px)
  opacity: 0
</style>
