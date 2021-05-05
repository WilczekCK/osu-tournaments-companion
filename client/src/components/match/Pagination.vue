<template lang="pug">
    .pagination__container
        p "page" {{ currentPage }} "of" {{ lastPage }}
        p
            button(@click="prevPage")="prev"
            button(@click="nextPage")="next"
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { usePagination } from 'vue-composable';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

const {
  currentPage, lastPage, next, prev,
} = usePagination({
  currentPage: 1,
  pageSize: 10,
  total: 50,
});

@Component
export default class SingleMatch extends Vue {
    nextPage = next

    prevPage = prev

    currentPage = currentPage

    lastPage = lastPage

    @Watch('currentPage.value', { immediate: true, deep: true })
    loadTournaments = async (newValue: string) => {
      console.log(newValue);
    }
}
</script>

<style lang="sass">
</style>
