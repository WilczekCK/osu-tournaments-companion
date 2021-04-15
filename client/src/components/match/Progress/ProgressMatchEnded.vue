<template lang="pug">
    .progress__match__ended
        ="Match won by somebody"
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
    @Prop() public team!: Record<string, unknown>;

    @Prop() public results!: Record<string, unknown>;

    teamWon = this.team;

    sumResults = this.results;
}
</script>

<style lang="sass">
</style>
