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
                ="Polska 4:3 Chiny"
            md-card-actions(md-aligment="space-between")
                md-card-expand-trigger
                    md-button(class="md-mini")
                        span(class="material-icons md-layout-item")
                            ="keyboard_arrow_down"
        md-card-expand-content
            md-card-content
                .match__container
                    .match__container__teams
                    .match__container__progress
                md-tabs(md-alignment="fixed")
                    md-tab(id="tab-teams" md-icon="teams")
                    md-tab(id="tab-progress" md-icon="progress")
                    md-tab(id="tab-playCharts" md-icon="games")
                    md-tab(id="tab-share" md-icon="share")
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SingleMatch extends Vue {
  @Prop() private msg!: string;
}
</script>

<style lang="sass">
.md-card
    max-width: 800px
    display: flex
    flex-wrap: wrap
    align-items: center
    box-sizing: border-box
    padding: 0px 20px
    &-media
        flex-grow: 0
    &-header
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
.md-card-media
    img
        height: 20px
        width: 20px

.match__container
    min-height: 150px
    &__teams
    &__progress
</style>
