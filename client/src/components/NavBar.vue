<template lang="pug">
    #nav
        router-link(to="/")
            ="Home"
        router-link(to="/about")
            ="About"
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
