<template lang="pug">
    md-card
        md-card-media
            img(src="@/assets/logo.png")
        md-card-header
            .md-title
                ="TRNT: (X) vs (Y)"
        md-card-expand
            md-card-actions(md-aligment="space-between")
                md-card-expand-trigger
                    md-button
                        span(class="material-icons md-layout-item")
                            ="keyboard_arrow_down"
        md-card-expand-content
            md-card-content
                ="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
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
    &-expand-content
        display: flex
        width: 100%
.md-card-media
    img
        height: 20px
        width: 20px
</style>
