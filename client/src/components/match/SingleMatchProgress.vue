<template lang="pug">
  .progress__container
    md-steppers
        md-step(md-label="Match created")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="Y won")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="Y won")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won")
            p="Lorem ipsum dolor sit amet"
        md-step(md-label="X won the match!")
            p="Lorem ipsum dolor sit amet"
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Vue } from 'vue-property-decorator';

@Component
export default class Progress extends Vue {
}
</script>

<style lang="sass">
</style>
