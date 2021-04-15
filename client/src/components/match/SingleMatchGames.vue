<template lang="pug">
    .games__container
        h3="SOON"
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class SingleMatch extends Vue {
}
</script>

<style lang="sass">
    .games__container
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        h3
            color: $link-active
            font-size: 3em
</style>
