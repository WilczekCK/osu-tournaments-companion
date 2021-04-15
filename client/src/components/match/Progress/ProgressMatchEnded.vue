<template lang="pug">
    .progress__match__ended
        .progress__match__ended--finalText
            ="Match won by the "
            b {{ teamWon.name }}
            =" team"
        .progress__match__ended--results
            = 'Blue '
            b {{sumResults.blue}}
            = ":"
            b {{sumResults.red}}
            = " Red"

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
