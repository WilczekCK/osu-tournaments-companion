<template lang="pug">
  .teams__container
    .teams__container--red
        .team__container__member(v-for="item in 5")
            ='RED'
            br/
    .teams__container--blue
        .team__container__member(v-for="item in 5")
            ='BLUE'
            br/
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class Teams extends Vue {
}
</script>

<style lang="sass">
.teams__container
    display: flex
    flex-wrap: wrap
    flex-direction: row
</style>
