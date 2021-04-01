<template lang="pug">

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SingleMatch extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="sass">
</style>
