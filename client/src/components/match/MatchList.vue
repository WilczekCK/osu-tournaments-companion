<template lang="pug">
  .match__container(v-if="allTournaments.length")
    SingleMatch(:tournamentInfo="tournament" v-for="tournament in allTournaments" :key="tournament.id")
  h3(v-else-if="allTournaments.length === undefined")="No more tournaments :("
  md-progress-spinner(md-mode="indeterminate" name="tournaments_spin" v-else)
</template>

<script lang="ts">
import {
  Component, Vue, Watch, Prop,
} from 'vue-property-decorator';
import SingleMatch from './SingleMatch.vue';

@Component({
  components: {
    SingleMatch,
  },
})
export default class MatchList extends Vue {
  @Prop() private tournaments!: any;

  // that's too big object, I cannot tell the type :/
  allTournaments = this.tournaments;

  @Watch('tournaments')
  loadTournaments(newValue: string) {
    this.allTournaments = newValue;
  }
}
</script>

<style lang="sass">
.match__container
</style>
