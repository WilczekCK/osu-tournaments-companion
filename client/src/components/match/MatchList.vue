<template lang="pug">
    div
      SingleMatch(:tournamentInfo="tournament" v-for="tournament in allTournaments" :key="tournament.id")
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
</style>
