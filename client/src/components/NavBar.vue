<template lang="pug">
    .navigation__container(class="md-layout md-alignment-center-center")
        .md-layout-item(class="md-size-15")
        .navigation__container--wrapper(class="md-layout-item md-layout md-gutter")
            router-link(to="/" class="md-layout-item")
                ="Home"
            router-link(to="/about" class="md-layout-item")
                ="About"
        .md-layout-item(class="md-size-15")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.navigation__container
    width 100%
    background #343434
    height 80px
</style>
