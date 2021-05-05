<template lang="pug">
    .pagination__container
        p "page" {{ currentPage }} "of" {{ lastPage }}
        p
            button(@click="prev")="prev"
            button(@click="next")="next"
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { usePagination } from 'vue-composable';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

const {
  currentPage, lastPage, next, prev, first, last,
} = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: 50,
});

@Component
export default class SingleMatch extends Vue {
    next = next

    prev = prev

    first = first

    last = last

    currentPage = currentPage

    lastPage = lastPage

    @Watch('currentPage.value', { immediate: true, deep: true })
    loadTournaments = async () => {
      console.log('it works');
    }
}
</script>

<style lang="sass">
</style>
