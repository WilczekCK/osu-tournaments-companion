<template lang="pug">
    .progress__map__container
        p {{ mapPlayed }}
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
    @Prop() public team!: Record<string, unknown>;

    @Prop() public map!: Record<string, unknown>;

    teamWon = this.team.name;

    mapPlayed = this.map;
}
</script>

<style lang="sass">
</style>
