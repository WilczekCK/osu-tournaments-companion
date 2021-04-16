<template lang="pug">
    .progress__match__started
        h4="Owner of the room:"
        .progress__match__started--judge
            .progress__match__started--judge--avatar
                img(:src="avatarLink" alt="user_avatar")
            .progress__match__started--judge--nickname
                ="Cookiezi"
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class ProgressStarted extends Vue {
    @Prop() private judgeId!: number;

    judgeOsuId = this.judgeId;

    avatarLink = `https://a.ppy.sh/${this.judgeOsuId}`;
}

</script>

<style lang="sass">
    .progress__match__started
        display: flex
        flex-direction: column
        &--judge
            display: flex
            flex-direction: row
            align-items: center
            &--avatar
                max-height: 100%
                width: 100px
            &--nickname
                padding-left: 5px
                font-size: 24px
</style>
