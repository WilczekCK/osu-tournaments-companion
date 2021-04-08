<template lang="pug">
    md-card
        md-card-media
            img(src="@/assets/logo.png")
        md-card-header
            .md-title
                ="TRNT: (X) vs (Y)"
            .md-subtitle
                ="In progress..."
        md-card-expand
            .md-score
                ="X 4:3 Y"
            md-card-actions(md-aligment="space-between")
                md-card-expand-trigger
                    md-button(class="md-mini")
                        span(class="material-icons md-layout-item")
                            ="keyboard_arrow_down"
        md-card-expand-content
            md-card-content
                .match__container
                    md-tabs(md-alignment="fixed")
                        md-tab(id="tab-teams" md-icon="teams")
                            SingleMatchTeams
                        md-tab(id="tab-progress" md-icon="progress")
                            SingleMatchProgress
                        md-tab(id="tab-playCharts" md-icon="games")
                            SingleMatchGames
                        md-tab(id="tab-share" md-icon="share")
                            ="Share"
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SingleMatchTeams from './SingleMatchTeams.vue';
import SingleMatchProgress from './SingleMatchProgress.vue';
import SingleMatchGames from './SingleMatchGames.vue';

@Component({
  components: {
    SingleMatchTeams,
    SingleMatchProgress,
    SingleMatchGames,
  },
})

export default class SingleMatch extends Vue {
  @Prop() private msg!: string;
}

console.log(SingleMatch);
</script>

<style lang="sass">
.md-card
    max-width: 800px
    display: flex
    flex-wrap: wrap
    align-items: center
    box-sizing: border-box
    padding: 0px 20px
    overflow: hidden
    z-index: 1
    &-content
        padding: 0
    &-media
        flex-grow: 0
    &-header
        z-index: 1
        flex-grow: 3
        padding-top: 16px !important
    &-expand
        display: flex
        align-items: center
        .md-score
            font-weight: 600
            font-size: 1.1em
            color: $bg-content
        &-content
            width: 100%
            overflow: hidden
            z-index: -1
            position: relative
.md-card-media
    img
        height: 20px
        width: 20px

.match__container
    .md-tabs
        flex-direction: column-reverse
        &-content
            height: unset
            min-height: 250px
        &-container
            height: 100%

.md-tab
    height: 100%
    padding: 0
</style>
